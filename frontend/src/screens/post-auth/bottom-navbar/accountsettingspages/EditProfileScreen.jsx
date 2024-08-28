import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);
  const [permission, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [cameraPermission, requestCameraPermission] = ImagePicker.useCameraPermissions();
  const [modalVisible, setModalVisible] = useState(false);

  if (!permission || !cameraPermission) {
    return <View />;
  }

  if (!permission.granted || !cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to use the camera and access the gallery</Text>
        <TouchableOpacity style={styles.requestPermissionButton} onPress={() => { requestPermission(); requestCameraPermission(); }}>
          <Text style={styles.requestPermissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
    }
  };

  const selectImage = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
              <Text style={styles.modalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={takePhoto}>
              <Text style={styles.modalButtonText}>Take a Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Image source={{ uri: profileImage || 'https://example.com/profile-image.png' }} style={styles.profileImage} />
      <TouchableOpacity onPress={selectImage}>
        <Text style={styles.editProfileText}>Edit profile image</Text>
      </TouchableOpacity>
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('EditNameScreen')}>
          <View style={styles.item}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>Helena Hills</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('EditUsernameScreen')}>
          <View style={styles.item}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.value}>@username</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('EditEmailScreen')}>
          <View style={styles.item}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>name@domain.com</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('EditLinksScreen')}>
          <View style={styles.item}>
            <Text style={styles.label}>Links</Text>
            <Text style={styles.value}>website.net, mylink.net</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('EditBioScreen')}>
          <View style={styles.item}>
            <Text style={styles.label}>Bio</Text>
            <Text style={styles.value}>A description of this user.</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  editProfileText: {
    color: 'blue',
    textAlign: 'center',
    marginVertical: 10,
  },
  itemContainer: {
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: 'gray',
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
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: 'black',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EditProfileScreen;
