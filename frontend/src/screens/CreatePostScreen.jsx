import React, { useState, useRef } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, Dimensions, Modal } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '../constants';

import { fetchWithTokenRefresh } from '../services/api';

import stayTuned from '../assets/images/staytuned.png';

const { height, width } = Dimensions.get('window');

export default function CreatePostScreen() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [description, setDescription] = useState('');
  const [cameraRollOption, setCameraRollOption] = useState('camera');
  const [fullScreen, setFullScreen] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [scheduleDate, setScheduleDate] = useState(null);
  const [isSchedule, setIsSchedule] = useState(false);
  const [is24hPost, setIs24hPost] = useState(false);
  const cameraRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to use the camera</Text>
        <TouchableOpacity style={styles.requestPermissionButton} onPress={requestPermission}>
          <Text style={styles.requestPermissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const cropImage = async (uri) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 300, height: 500 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    setMedia(manipResult.uri);
    setFullScreen(false);
  };

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const pickedAsset = result.assets[0];
      setMediaType(pickedAsset.type);
      if (pickedAsset.type === 'image') {
        await cropImage(pickedAsset.uri);
      } else {
        setMedia(pickedAsset.uri);
        setFullScreen(false);
      }
    }
  };

  const captureMedia = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 5],
      quality: 1,
    });

    if (!result.canceled) {
      const capturedAsset = result.assets[0];
      setMediaType(capturedAsset.type);
      if (capturedAsset.type === 'image') {
        await cropImage(capturedAsset.uri);
      } else {
        setMedia(capturedAsset.uri);
        setFullScreen(false);
      }
    }
  };

  const cancelMedia = () => {
    setMedia(null);
    setFullScreen(true);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setScheduleDate(date);
    hideDatePicker();
  };

  const showModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const handleOkPress = () => {
    setModalVisible(false);
    if (modalType === 'schedule') {
      setIsSchedule(false);
    } else if (modalType === '24hPost') {
      setIs24hPost(false);
    }
  };

  const handlePostSubmission = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
      
      if (media) 
      {
        const formData = new FormData();
    
        // Append the file, setting the name as 'file' to match your backend serializer
        formData.append('file', {
          uri: media,               // Local file path
          type: mediaType === 'image' ? 'image/jpeg' : 'video/mp4',  // MIME type
          name: mediaType === 'image' ? 'photo.jpg' : 'video.mp4',   // File name
        });
  
      if (!accessToken) {
        console.error('No access token found, unable to proceed with the request.');
        return;
      }
  
      const response = await fetchWithTokenRefresh(`${API_URL}/posts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          // No need to set Content-Type for FormData; it's automatically set
        },
        body: JSON.stringify(formData)
      });
  
      if (response.status === 201) {
        console.log('Post created successfully:', await response.json());
      } else {
        console.error('Failed to create post:', response.status);
      }
    }
    }
    catch (error) {
      console.error('Error while creating post:', error);
    }
    
  };
  
  

  const toggleSchedule = () => {
    setIsSchedule(!isSchedule);
    showModal('schedule');
  };

  const toggle24hPost = () => {
    setIs24hPost(!is24hPost);
    showModal('24hPost');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleOkPress}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <ImageBackground source={stayTuned} style={styles.imageBackground} imageStyle={styles.imageBorderRadius}>
                <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
                  <Text style={styles.okButtonText}>OK</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </View>
        </Modal>
        {fullScreen ? (
          <>
            <View style={styles.fullScreenContainer}>
              <CameraView style={styles.fullScreenCamera} ref={cameraRef} facing={facing} />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.uploadFromCameraRollButton} onPress={pickMedia}>
                <MaterialIcons name="photo-library" size={44} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.takePictureButton} onPress={captureMedia}>
                <MaterialIcons name="camera" size={44} color="black" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.imageBox}>
              {mediaType === 'image' && media && (
                <Image source={{ uri: media }} style={styles.image} />
              )}
              {mediaType === 'video' && media && (
                <Video
                  source={{ uri: media }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="contain"
                  shouldPlay
                  isLooping
                  style={styles.video}
                />
              )}
            </View>
            {media && (
              <TouchableOpacity style={styles.cancelButton} onPress={cancelMedia}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            )}
            <View style={styles.formContainer}>
              <View style={styles.descriptionContainer}>
                <TextInput
                  style={[styles.descriptionInput, description && styles.descriptionText]}
                  placeholder="Add Description"
                  placeholderTextColor="gray"
                  onChangeText={setDescription}
                  value={description}
                  multiline
                  numberOfLines={3}
                  maxHeight={60}
                  scrollEnabled
                />
              </View>
            </View>
            <View style={styles.scheduleRow}>
              <View style={styles.scheduleContainer}>
                <TouchableOpacity onPress={toggleSchedule} style={styles.scheduleCheckbox}>
                  {isSchedule ? (
                    <MaterialCommunityIcons name="checkbox-marked" size={24} color="black" />
                  ) : (
                    <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" />
                  )}
                </TouchableOpacity>
                <Text style={styles.scheduleText}>Schedule Post</Text>
                <TouchableOpacity onPress={showDatePicker} style={styles.calendarButtonInline}>
                  <MaterialIcons name="calendar-today" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View style={styles.scheduleContainer}>
                <TouchableOpacity onPress={toggle24hPost} style={styles.scheduleCheckbox}>
                  {is24hPost ? (
                    <MaterialCommunityIcons name="checkbox-marked" size={24} color="black" />
                  ) : (
                    <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" />
                  )}
                </TouchableOpacity>
                <Text style={styles.scheduleText}>24h Post</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.postButton} onPress={handlePostSubmission}>
              <Text style={styles.postButtonText}>{isSchedule ? 'Schedule' : 'Post'}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageBorderRadius: {
    borderRadius: 20,
  },
  okButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: 'black',
    borderRadius: 5,
    marginBottom: 20,
  },
  okButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fullScreenContainer: {
    width: '100%',
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
  },
  fullScreenCamera: {
    width: '100%',
    height: '100%',
  },
  imageBox: {
    height: 230,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  video: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 30,
  },
  scheduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleCheckbox: {
    marginRight: 10,
    marginLeft: 10,
  },
  scheduleText: {
    fontSize: 16,
  },
  scheduleDateText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
  takePictureButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadFromCameraRollButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 10,
    flex: 1,
    padding: 20,
  },
  descriptionContainer: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
  },
  descriptionInput: {
    fontSize: 16,
    color: 'black',
    padding: 0,
    margin: 0,
    maxHeight: 60,
  },
  descriptionText: {
    borderBottomWidth: 0,
  },
  calendarButton: {
    alignSelf: 'center',
    marginTop: 10,
  },
  calendarButtonInline: {
    marginLeft: 10,
  },
  postButton: {
    backgroundColor: 'black',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  requestPermissionButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  requestPermissionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
