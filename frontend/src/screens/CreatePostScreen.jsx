import React, { useState, useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, Dimensions, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Video } from 'expo-av';
import axios from 'axios';

const { height, width } = Dimensions.get('window');

export default function CreatePostScreen() {
  const [facing, setFacing] = useState('back'); // Camera facing state
  const [permission, requestPermission] = useCameraPermissions(); // Camera permission state
  const [media, setMedia] = useState(null); // Media state (image or video)
  const [mediaType, setMediaType] = useState(null); // Media type (image or video)
  const [selectedGroup, setSelectedGroup] = useState(''); // Selected group state
  const [description, setDescription] = useState(''); // Description state
  const [uploadOption, setUploadOption] = useState('album'); // Upload option state (album/group)
  const [cameraRollOption, setCameraRollOption] = useState('camera'); // Default to camera
  const [fullScreen, setFullScreen] = useState(true); // Full screen state
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // Date picker visibility state
  const [scheduleDate, setScheduleDate] = useState(null); // Scheduled date state
  const [isSchedule, setIsSchedule] = useState(false); // Schedule post state
  const [is24hPost, setIs24hPost] = useState(false); // 24h post state
  const cameraRef = useRef(null); // Reference to camera

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

  // Handle upload option change (album/group)
  const handleUploadOption = (option) => {
    setUploadOption(option);
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
    setScheduleDate(date);
    hideDatePicker();
  };

  // Toggle the schedule post option and reset the date if unchecked
  const toggleSchedule = () => {
    if (isSchedule) {
      setScheduleDate(null); // Reset the schedule date
    }
    setIsSchedule(!isSchedule);
  };

  // Toggle the 24h post option
  const toggle24hPost = () => {
    setIs24hPost(!is24hPost);
  };

  // Handle Post Submission
  const handlePost = async () => {
    try {
      // Commented out 24-hour post and scheduled post logic
      // const expirationDate = calculateExpirationDate();

      const formData = new FormData();
      formData.append('description', description);
      formData.append('group', selectedGroup);
      // formData.append('scheduleDate', scheduleDate ? scheduleDate.toISOString() : null);
      // formData.append('expirationDate', expirationDate.toISOString());
      // formData.append('is24hPost', is24hPost);
      
      if (media) {
        const fileType = mediaType === 'image' ? 'image/jpeg' : 'video/mp4';
        formData.append('media', {
          uri: media,
          name: `media.${mediaType === 'image' ? 'jpg' : 'mp4'}`,
          type: fileType,
        });
      }

      const response = await axios.post('http://your-backend-url.com/api/posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Post created successfully:', response.data);
      // Handle successful post submission (e.g., navigate to home screen, clear form)
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
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
              <TouchableOpacity
                style={[styles.uploadOptionButton, styles.leftAlignButton]}
                onPress={() => handleUploadOption('album')}
              >
                <Text style={[styles.uploadOptionButtonText, uploadOption === 'album' && styles.uploadOptionButtonTextSelected]}>Post To Album</Text>
              </TouchableOpacity>

              <View style={styles.groupSelectionContainer}>
                <TouchableOpacity
                  style={[styles.uploadOptionButton, styles.leftAlignButton]}
                  onPress={() => handleUploadOption('group')}
                >
                  <Text style={[styles.uploadOptionButtonText, uploadOption === 'group' && styles.uploadOptionButtonTextSelected]}>Post To Group</Text>
                </TouchableOpacity>
                {uploadOption === 'group' && (
                  <ScrollView
                    style={styles.groupScrollView}
                    nestedScrollEnabled={true}
                  >
                    <Picker
                      selectedValue={selectedGroup}
                      style={styles.groupPicker}
                      onValueChange={(itemValue, itemIndex) => setSelectedGroup(itemValue)}
                    >
                      <Picker.Item label="Select Group" value="" />
                      <Picker.Item label="Group 1" value="group1" />
                      <Picker.Item label="Group 2" value="group2" />
                      <Picker.Item label="Group 3" value="group3" />
                      <Picker.Item label="Group 4" value="group4" />
                    </Picker>
                  </ScrollView>
                )}
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
            {scheduleDate && (
              <Text style={styles.scheduleDateText}>
                {scheduleDate.toLocaleString()}
              </Text>
            )}
            <DateTimePickerModal
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
            />
            <TouchableOpacity style={styles.postButton} onPress={handlePost}>
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
  uploadOptionButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  leftAlignButton: {
    alignItems: 'flex-start',
  },
  uploadOptionButtonText: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 16,
  },
  uploadOptionButtonTextSelected: {
    color: 'black',
    fontSize: 25,
  },
  pickerContainer: {
    alignSelf: 'stretch',
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
  groupSelectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  groupPickerContainer: {
    flex: 1,
    maxHeight: 100, // Adjust height to allow only 2 options to display before scrolling
    marginLeft: 10,
  },
  groupScrollView: {
    flexGrow: 0, // Prevent ScrollView from expanding to fit content
  },
  groupPicker: {
    height: '100%',
    width: '100%',
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
