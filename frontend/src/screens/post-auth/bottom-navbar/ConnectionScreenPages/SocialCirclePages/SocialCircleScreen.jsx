import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Modal, Image, ScrollView } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';

// Sample Data for Dummy Messages
const messages = [
  {
    id: '1',
    user: 'Lily',
    time: '08/21/2024 1:11 PM',
    text: 'Oh wow!! :) I was reading about this topic in my other groups and there were surprisingly a lot of great suggestions about achieving goals and overcoming your fears.',
    type: 'text',
  },
  {
    id: '2',
    user: 'John',
    time: '08/21/2024 1:14 PM',
    text: 'Voice Note',
    type: 'voice',
  },
  {
    id: '3',
    user: 'Oliver',
    time: '08/21/2024 1:20 PM',
    text: '',
    type: 'image',
  },
  {
    id: '4',
    user: 'Alice',
    time: '08/21/2024 1:25 PM',
    text: 'I found a great method for setting achievable goals, would love to share!',
    type: 'text',
  },
  {
    id: '5',
    user: 'Mike',
    time: '08/21/2024 1:30 PM',
    text: 'Check out this beautiful sunset I captured!',
    type: 'image',
  },
  {
    id: '6',
    user: 'Lucy',
    time: '08/21/2024 1:35 PM',
    text: 'Voice Note',
    type: 'voice',
  },
  {
    id: '7',
    user: 'Oliver',
    time: '08/21/2024 1:40 PM',
    text: 'Stay motivated everyone! Keep pushing forward!',
    type: 'text',
  },
  {
    id: '8',
    user: 'Sarah',
    time: '08/21/2024 1:45 PM',
    text: 'Voice Note',
    type: 'voice',
  },
  {
    id: '9',
    user: 'David',
    time: '08/21/2024 1:50 PM',
    text: 'Anyone interested in a group meditation session?',
    type: 'text',
  },
  {
    id: '10',
    user: 'Emily',
    time: '08/21/2024 1:55 PM',
    text: 'Voice Note',
    type: 'voice',
  },
  {
    id: '11',
    user: 'Liam',
    time: '08/21/2024 2:00 PM',
    text: 'Here is a quick video of our last session!',
    type: 'image',
  },
  {
    id: '12',
    user: 'Olivia',
    time: '08/21/2024 2:05 PM',
    text: 'Voice Note',
    type: 'voice',
  }
];

const SocialCircleScreen = () => {
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
  const [recordingState, setRecordingState] = useState('initial'); // States: 'initial', 'recording', 'paused', 'stopped'
  const [elapsedSeconds, setElapsedSeconds] = useState(0); // Track the elapsed recording time in seconds

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
    if (!cameraPermission?.granted) {
      requestCameraPermission();
    }
  }, [permission, cameraPermission]);

  const startRecording = async () => {
    try {
      console.log('Requesting audio permission...');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording...');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      setRecordingState('recording');
      startTimer();
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return; // Check if recording exists

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
    await cancelRecording(true); // Ensure it does not hide the modal
    startRecording();
  };

  const startTimer = () => {
    const id = setInterval(() => {
      setElapsedSeconds((prevSeconds) => {
        const newSeconds = prevSeconds + 1;
        const minutes = Math.floor(newSeconds / 60);
        const secondsDisplay = newSeconds % 60;
        setRecordingTime(
          `${minutes.toString().padStart(2, '0')}:${secondsDisplay
            .toString()
            .padStart(2, '0')}`
        );
        return newSeconds;
      });
    }, 1000);
    setIntervalId(id);
  };

  const cancelRecording = async (keepModalVisible = false) => {
    console.log('Canceling recording...');
    if (recording && recording._isRecording) {
      // Check if the recording is still active before stopping
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
    setElapsedSeconds(0);
    setRecordingState('initial');
    setRecording(null); // Reset the recording state

    if (!keepModalVisible) {
      setRecordingModalVisible(false);
    }
  };

  // Function to open the gallery
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

  // Function to open the camera
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

  // Function to handle sending an image
  const sendImage = () => {
    console.log('Sending image:', selectedImage);
    setSelectedImage(null);
    setImagePreviewVisible(false);
  };

  // Function to handle sending audio
  const sendAudio = () => {
    console.log('Sending audio:', recordedAudioUri);
    setRecordedAudioUri('');
    setRecordingTime('00:00');
    setRecordingModalVisible(false);
  };

  // Function to show the modal for choosing image
  const handleAttachmentPress = () => {
    setModalVisible(true);
  };

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar} />
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.user}>{item.user}</Text>
        <Text style={styles.time}>{item.time}</Text>
        {item.type === 'text' && item.text !== '' && <Text style={styles.text}>{item.text}</Text>}
        {item.type === 'voice' && (
          <TouchableOpacity style={styles.voiceNote}>
            <FontAwesome name="microphone" size={24} color="white" />
            <Text style={styles.voiceText}>Voice Note</Text>
          </TouchableOpacity>
        )}
        {item.type === 'image' && (
          <View style={styles.imageContainer}>
            <View style={styles.imagePlaceholder} />
          </View>
        )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      <View style={styles.headerContainer}>
        <View style={styles.largeGreyCircle} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.header}>Goals</Text>
          <Text style={styles.subheader}>
            Learning how to set goals and achieve them together. We hold each other accountable and support each other’s journey.
          </Text>
          <Text style={styles.moderator}>
            <Text style={{ color: 'black' }}>Moderator: </Text>
            <Text style={{ color: '#1E90FF' }}>Oliver</Text>
          </Text>
          <Text style={styles.members}>1.6k members</Text>
        </View>
      </View>

      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Input Box */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write something..."
          value={message}
          onChangeText={setMessage}
          multiline={false} // Ensures single-line input
          scrollEnabled // Enables scrolling for overflowing text
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={imagePreviewVisible}
        onRequestClose={() => setImagePreviewVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.previewContainer}>
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            )}
            <TouchableOpacity style={styles.sendButton} onPress={sendImage}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Recording Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={recordingModalVisible}
        onRequestClose={cancelRecording}
      >
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  largeGreyCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    marginRight: 15,
  },
  headerTextContainer: {
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subheader: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  moderator: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  members: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  chatContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingHorizontal: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  messageContent: {
    flex: 1,
  },
  user: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
  voiceNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: 120,
    marginBottom: 5,
  },
  voiceText: {
    color: 'white',
    marginLeft: 10,
  },
  imageContainer: {
    marginTop: 5,
  },
  imagePlaceholder: {
    width: 150,
    height: 100,
    backgroundColor: '#ddd',
    borderRadius: 5,
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
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    flex: 1, // Takes remaining space
  },
  attachmentButton: {
    marginRight: 10,
  },
  microphoneButton: {
    marginRight: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: 'black',
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

export default SocialCircleScreen;
