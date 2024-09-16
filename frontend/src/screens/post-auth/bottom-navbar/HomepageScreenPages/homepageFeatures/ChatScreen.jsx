import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Modal, Image } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';

const messages = [
  { id: '1', text: 'Hey there! 👋', time: '9:30', sender: 'other', type: 'text' },
  { id: '2', text: "What's the latest and greatest in your world?", time: '9:30', sender: 'other', type: 'text' },
  { id: '3', text: "Oh, just the usual shenanigans. 😅 You won't believe what happened at work today!", time: '9:31', sender: 'me', type: 'text' },
  { id: '4', text: "Spill the beans! I'm ready for some workplace drama. 😂", time: '9:31', sender: 'other', type: 'text' },
  { id: '5', text: "So, our boss decided to have a team-building exercise...", time: '9:31', sender: 'me', type: 'text' },
  { id: '6', text: "Interpretive dance. I kid you not. 🕺💃", time: '9:32', sender: 'me', type: 'text' },
  { id: '7', text: "No way! 😂 Did you break out the moonwalk or go full salsa mode?", time: '9:32', sender: 'other', type: 'text' },
  { id: '8', text: "I attempted the moonwalk, but it turned into a moon faceplant. 😂 #EpicFail", time: '9:32', sender: 'me', type: 'text' },
];

const ChatScreen = ({ route }) => {
  const { name } = route.params; // Extract the 'name' parameter from the route

  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [permission, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [cameraPermission, requestCameraPermission] = ImagePicker.useCameraPermissions();
  const [modalVisible, setModalVisible] = useState(false);
  const [imagePreviewVisible, setImagePreviewVisible] = useState(false);
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedAudioUri, setRecordedAudioUri] = useState('');
  const [recordingModalVisible, setRecordingModalVisible] = useState(false);
  const [recordingTime, setRecordingTime] = useState('00:00');
  const [intervalId, setIntervalId] = useState(null);
  const [recordingState, setRecordingState] = useState('initial');

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
    if (!cameraPermission?.granted) {
      requestCameraPermission();
    }
  }, [permission, cameraPermission]);

  useEffect(() => {
    // Cleanup function to release the recording object when the component is unmounted or when a recording is finished
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync().catch(() => {});
        setRecording(null);
      }
      clearInterval(intervalId);
    };
  }, [recording]);

  const startRecording = async () => {
    try {
      console.log('Requesting audio permission...');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      if (recording) {
        await recording.stopAndUnloadAsync();
        setRecording(null);
      }

      console.log('Starting recording...');
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
      setRecordingState('recording');
      startTimer();
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    console.log('Stopping recording...');
    setIsRecording(false);
    setRecordingState('stopped');
    clearInterval(intervalId);
    setIntervalId(null);

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordedAudioUri(uri);
      console.log('Recording stopped and stored at', uri);
    } catch (err) {
      console.error('Error stopping recording:', err);
    } finally {
      setRecording(null);
    }
  };

  const pauseRecording = async () => {
    if (recording) {
      console.log('Pausing recording...');
      await recording.pauseAsync();
      setIsPaused(true);
      clearInterval(intervalId);
      setRecordingState('paused');
      console.log('Recording paused');
    }
  };

  const resumeRecording = async () => {
    if (recording) {
      console.log('Resuming recording...');
      await recording.startAsync();
      setIsPaused(false);
      startTimer();
      setRecordingState('recording');
      console.log('Recording resumed');
    }
  };

  const restartRecording = async () => {
    console.log('Restarting recording...');
    await cancelRecording(true);
    startRecording();
  };

  const startTimer = () => {
    const id = setInterval(() => {
      setRecordingTime((prevTime) => {
        const seconds = parseInt(prevTime.split(':')[1]) + 1;
        const minutes = parseInt(prevTime.split(':')[0]) + (seconds === 60 ? 1 : 0);
        const newSeconds = seconds === 60 ? 0 : seconds;
        return `${minutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
      });
    }, 1000);
    setIntervalId(id);
  };

  const cancelRecording = async (keepModalVisible = false) => {
    console.log('Canceling recording...');
    if (recording && recording._isRecording) {
      try {
        await recording.stopAndUnloadAsync();
      } catch (err) {
        console.error('Error unloading recording:', err);
      }
    }
    clearInterval(intervalId);
    setIntervalId(null);
    setIsRecording(false);
    setRecordingTime('00:00');
    setRecordingState('initial');
    setRecording(null);

    if (!keepModalVisible) {
      setRecordingModalVisible(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setImagePreviewVisible(true);
    }
    setModalVisible(false);
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setImagePreviewVisible(true);
    }
    setModalVisible(false);
  };

  const sendImage = () => {
    console.log('Sending image:', selectedImage);
    setSelectedImage(null);
    setImagePreviewVisible(false);
  };

  const sendAudio = () => {
    console.log('Sending audio:', recordedAudioUri);
    setRecordedAudioUri('');
    setRecordingTime('00:00');
    setRecordingModalVisible(false);
  };

  const handleAttachmentPress = () => {
    setModalVisible(true);
  };

  const renderMessage = ({ item }) => {
    const isMe = item.sender === 'me';
    return (
      <View style={[styles.messageContainer, isMe ? styles.myMessage : styles.theirMessage]}>
        <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.theirMessageText]}>{item.text}</Text>
        <Text style={[styles.messageTime, isMe ? styles.myMessageTime : styles.theirMessageTime]}>{item.time}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <FlatList data={messages} renderItem={renderMessage} keyExtractor={item => item.id} style={styles.messageList} />

      {/* Input Box */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write something..."
          value={message}
          onChangeText={setMessage}
          multiline={false}
          scrollEnabled
        />
        <TouchableOpacity style={styles.attachmentButton} onPress={handleAttachmentPress}>
          <MaterialIcons name="attach-file" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.microphoneButton} onPress={() => setRecordingModalVisible(true)}>
          <Ionicons name="mic-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Modal for Selecting Image */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
              <MaterialIcons name="photo-library" size={44} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={takePhoto}>
              <MaterialIcons name="camera-alt" size={44} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Image Preview Modal */}
      <Modal animationType="slide" transparent={true} visible={imagePreviewVisible} onRequestClose={() => setImagePreviewVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.previewContainer}>
            {selectedImage && <Image source={{ uri: selectedImage }} style={styles.previewImage} />}
            <TouchableOpacity style={styles.sendButton} onPress={sendImage}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Recording Modal */}
      <Modal animationType="slide" transparent={true} visible={recordingModalVisible} onRequestClose={cancelRecording}>
        <View style={styles.modalOverlay}>
          <View style={styles.recordingContainer}>
            <Ionicons name="mic-outline" size={44} color="red" />
            <Text style={styles.recordingTime}>{recordingTime}</Text>
            <View style={styles.recordingControls}>
              {recordingState === 'initial' && (
                <TouchableOpacity style={styles.controlButton} onPress={startRecording}>
                  <Text style={styles.controlButtonText}>Start</Text>
                </TouchableOpacity>
              )}
              {recordingState === 'recording' && (
                <>
                  <TouchableOpacity style={styles.controlButton} onPress={pauseRecording}>
                    <Text style={styles.controlButtonText}>Pause</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.controlButton} onPress={stopRecording}>
                    <Text style={styles.controlButtonText}>Stop</Text>
                  </TouchableOpacity>
                </>
              )}
              {recordingState === 'paused' && (
                <TouchableOpacity style={styles.controlButton} onPress={resumeRecording}>
                  <Text style={styles.controlButtonText}>Resume</Text>
                </TouchableOpacity>
              )}
              {recordingState === 'stopped' && (
                <>
                  <TouchableOpacity style={styles.controlButton} onPress={restartRecording}>
                    <Text style={styles.controlButtonText}>Restart</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.sendButton} onPress={sendAudio}>
                    <Text style={styles.sendButtonText}>
                      Send <Ionicons name="send" size={16} color="white" />
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            <TouchableOpacity style={styles.cancelButton} onPress={() => cancelRecording(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageList: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  messageContainer: {
    maxWidth: '75%',
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  myMessage: {
    backgroundColor: '#E0F7FA',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#F0F0F0',
  },
  messageText: {
    fontSize: 14,
    marginBottom: 5,
  },
  myMessageText: {
    color: '#000',
  },
  theirMessageText: {
    color: '#000',
  },
  messageTime: {
    fontSize: 10,
    color: '#888',
    textAlign: 'right',
  },
  myMessageTime: {
    alignSelf: 'flex-end',
  },
  theirMessageTime: {
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
  },
  attachmentButton: {
    marginRight: 10,
  },
  microphoneButton: {
    marginRight: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    marginLeft: 10,
    backgroundColor: '#555',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  iconButton: {
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
  },
  previewContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  recordingContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  recordingControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  controlButton: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 16,
  },
  recordingTime: {
    fontSize: 18,
    color: 'red',
    marginVertical: 10,
  },
});

export default ChatScreen;
