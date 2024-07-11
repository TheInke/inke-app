import React, { useState, useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function CreatePostScreen() {
  const [facing, setFacing] = useState('back'); // Camera facing state
  const [permission, requestPermission] = useCameraPermissions(); // Camera permission state
  const [image, setImage] = useState(null); // Image state
  const [selectedGroup, setSelectedGroup] = useState(''); // Selected group state
  const [description, setDescription] = useState(''); // Description state
  const [uploadOption, setUploadOption] = useState('album'); // Upload option state (album/group)
  const [cameraRollOption, setCameraRollOption] = useState('camera'); // Default to camera
  const [fullScreen, setFullScreen] = useState(false); // Full screen state
  const [ratio, setRatio] = useState([4, 3]); // Default ratio for cropping
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // Date picker visibility state
  const [scheduleDate, setScheduleDate] = useState(null); // Scheduled date state
  const [isSchedule, setIsSchedule] = useState(false); // Schedule post state
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
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.requestPermissionButton} onPress={requestPermission}>
          <Text style={styles.requestPermissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Toggle camera facing
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  // Pick an image from the camera roll
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync(); // Request permission to access the image library
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Allow all media types
      allowsEditing: true,
      aspect: ratio, // Set the aspect ratio for cropping
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Set the selected image
      setCameraRollOption('cameraRoll'); // Ensure the camera roll option is displayed
    }
  };

  // Take a picture using the camera
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ ratio: `${ratio[0]}:${ratio[1]}` });
      setImage(photo.uri); // Set the captured image
      setCameraRollOption('camera'); // Switch back to camera view
    }
  };

  // Cancel the selected image
  const cancelImage = () => {
    setImage(null);
    setCameraRollOption('camera');
  };

  // Toggle full screen mode for the image
  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
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
    console.log("A date has been picked: ", date);
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={[styles.imageBox, fullScreen && styles.fullScreenImageBox]}>
          <TouchableOpacity style={styles.fullScreenToggle} onPress={toggleFullScreen}>
            <MaterialCommunityIcons name={fullScreen ? "arrow-collapse" : "arrow-expand"} size={24} color="black" />
          </TouchableOpacity>
          {cameraRollOption === 'camera' && !image ? (
            <CameraView style={styles.camera} ref={cameraRef} facing={facing}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.uploadFromCameraRollButton} onPress={pickImage}>
                  <MaterialIcons name="photo-library" size={44} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.takePictureButton} onPress={takePicture}>
                  <MaterialIcons name="camera" size={44} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.toggleCameraButton} onPress={toggleCameraFacing}>
                  <MaterialIcons name="flip-camera-ios" size={44} color="white" />
                </TouchableOpacity>
              </View>
            </CameraView>
          ) : (
            image && <Image source={{ uri: image }} style={styles.image} />
          )}
        </View>
        {image && (
          <TouchableOpacity style={styles.cancelButton} onPress={cancelImage}>
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
          <TouchableOpacity
            style={[styles.uploadOptionButton, styles.leftAlignButton]}
            onPress={() => handleUploadOption('album')}
          >
            <Text style={[styles.uploadOptionButtonText, uploadOption === 'album' && styles.uploadOptionButtonTextSelected]}>Post To Album</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.uploadOptionButton, styles.leftAlignButton]}
            onPress={() => handleUploadOption('group')}
          >
            <Text style={[styles.uploadOptionButtonText, uploadOption === 'group' && styles.uploadOptionButtonTextSelected]}>Post To Group</Text>
          </TouchableOpacity>
          {uploadOption === 'group' && (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedGroup}
                style={styles.groupPicker}
                onValueChange={(itemValue, itemIndex) => setSelectedGroup(itemValue)}
              >
                <Picker.Item label="Select Group" value="" />
                <Picker.Item label="Group 1" value="group1" />
                <Picker.Item label="Group 2" value="group2" />
                <Picker.Item label="Group 3" value="group3" />
              </Picker>
            </View>
          )}
        </View>
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
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>{isSchedule ? 'Schedule' : 'Post'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  imageBox: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  fullScreenImageBox: {
    height: '100%',
  },
  fullScreenToggle: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  toggleCameraButton: {
    // backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginRight: 50,
  },
  toggleCameraButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  takePictureButton: {
    // backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  takePictureButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  uploadFromCameraRollButton: {
    // backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  uploadFromCameraRollButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
    fontSize: 20,
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
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 10,
    flex: 1,
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
  groupPicker: {
    height: 50,
    width: '100%',
  },
  calendarButton: {
    alignSelf: 'center',
    marginTop: 10,
  },
  calendarButtonInline: {
    marginLeft: 10,
  },
  scheduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  scheduleCheckbox: {
    marginRight: 10,
  },
  scheduleText: {
    fontSize: 16,
  },
  scheduleDateText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
  postButton: {
    backgroundColor: 'black',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  requestPermissionButton: {
    backgroundColor: 'blue',
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
