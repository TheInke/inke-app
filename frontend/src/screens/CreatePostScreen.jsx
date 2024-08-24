import React, { useState, useRef } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, Dimensions, Modal } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Video } from 'expo-av';

import stayTuned from '../assets/images/staytuned.png';

const { height, width } = Dimensions.get('window');

export default function CreatePostScreen() {
  const [facing, setFacing] = useState('back'); // Camera facing state
  const [permission, requestPermission] = useCameraPermissions(); // Camera permission state
  const [media, setMedia] = useState(null); // Media state (image or video)
  const [mediaType, setMediaType] = useState(null); // Media type (image or video)
  const [description, setDescription] = useState(''); // Description state
  const [cameraRollOption, setCameraRollOption] = useState('camera'); // Default to camera
  const [fullScreen, setFullScreen] = useState(true); // Full screen state
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // Date picker visibility state
  const [scheduleDate, setScheduleDate] = useState(null); // Scheduled date state
  const [isSchedule, setIsSchedule] = useState(false); // Schedule post state
  const [is24hPost, setIs24hPost] = useState(false); // 24h post state
  const cameraRef = useRef(null); // Reference to camera
  const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  const [modalType, setModalType] = useState(''); // Track which button triggered the modal

  // Set the maximum date to 7 days from the current date
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);

  // Check if camera permissions are still loading
  if (!permission) {
    return <View />;
  }

  // Check if camera permissions are granted
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

  // Crop the image to a 3:5 aspect ratio
  const cropImage = async (uri) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 300, height: 500 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    setMedia(manipResult.uri);
    setFullScreen(false);
  };

  // Pick an image or video from the camera roll
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
        await cropImage(pickedAsset.uri); // Crop the selected image
      } else {
        setMedia(pickedAsset.uri);
        setFullScreen(false);
      }
    }
  };

  // Take a picture or video using the camera
  const captureMedia = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 5], // Enforce 3:5 aspect ratio
      quality: 1,
    });

    if (!result.canceled) {
      const capturedAsset = result.assets[0];
      setMediaType(capturedAsset.type);
      if (capturedAsset.type === 'image') {
        await cropImage(capturedAsset.uri); // Crop the captured image
      } else {
        setMedia(capturedAsset.uri);
        setFullScreen(false);
      }
    }
  };

  // Cancel the selected or captured media
  const cancelMedia = () => {
    setMedia(null);
    setFullScreen(true); // Go back to full screen camera
  };

  // Show the date picker modal
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Hide the date picker modal
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Handle date confirmation from the date picker
  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    setScheduleDate(date);
    hideDatePicker();
  };

  // Show the custom modal with the image
  const showModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  // Handle "OK" button press in the modal
  const handleOkPress = () => {
    setModalVisible(false);
    if (modalType === 'schedule') {
      setIsSchedule(false); // Deselect the "Schedule Post" button
    } else if (modalType === '24hPost') {
      setIs24hPost(false); // Deselect the "24h Post" button
    }
  };

  // Toggle the schedule post option and reset the date if unchecked
  const toggleSchedule = () => {
    if (isSchedule) {
      setScheduleDate(null); // Reset the schedule date
    }
    setIsSchedule(!isSchedule);
    showModal('schedule'); // Show the image in the modal
  };

  // Toggle the 24h post option
  const toggle24hPost = () => {
    setIs24hPost(!is24hPost);
    showModal('24hPost'); // Show the image in the modal
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
                  numberOfLines={3} // Maximum number of visible lines
                  maxHeight={60} // Maximum height for the text input
                  scrollEnabled // Enable scrolling within the text input
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
            {/* 
            The DateTimePickerModal and the related state have been kept for future use 
            but are commented out for now since the backend is not ready.
            */}
            {/* <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              minimumDate={new Date()} // Minimum date set to current date
              maximumDate={maxDate} // Maximum date set to 7 days from current date
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              pickerContainerStyleIOS={{
                backgroundColor: 'black' // Set the background color to black
              }}
              textColor="white" // Set the text color to white
            /> */}
            <TouchableOpacity style={styles.postButton} onPress={() => {
              // Commented out for now, as backend is not ready.
              // const expirationDate = calculateExpirationDate();
              // if (expirationDate) {
              //   console.log('Post Expiration Date:', expirationDate);
              // }
              console.log('Post submitted');
            }}>
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
    width: '90%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20, // Added border radius
    overflow: 'hidden', // Ensures image and content respects border radius
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end', // Position the button at the bottom
    alignItems: 'center', // Center the button horizontally
  },
  imageBorderRadius: {
    borderRadius: 20, // Ensures the image respects the border radius
  },
  okButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: 'black',
    borderRadius: 10,
    marginBottom: 20, // Add some space from the bottom
  },
  okButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fullScreenContainer: {
    width: '100%',
    height: '85%', // Adjusted height
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black', // Added black border
    borderWidth: 2, // Adjust border width as needed
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
    height: 60, // Adjust height as needed
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
    maxHeight: 60, // Maximum height for the text input
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
    marginBottom: 5, // Added bottom margin for the post button
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
