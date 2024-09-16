import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

const CreateSocialCircleScreen = () => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);
  const [circleName, setCircleName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false); // State to handle loading
  const [permission, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [cameraPermission, requestCameraPermission] = ImagePicker.useCameraPermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
    if (!cameraPermission?.granted) {
      requestCameraPermission();
    }
  }, [permission, cameraPermission]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
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
      setProfileImage(result.assets[0].uri);
    }
    setModalVisible(false);
  };

  const selectImage = () => {
    setModalVisible(true);
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleCreate = async () => {
    if (!circleName || !description) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    setLoading(true); // Start loading

    try {
      const formData = new FormData();
      formData.append('name', circleName);
      formData.append('description', description);
      tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });

      if (profileImage) {
        formData.append('image', {
          uri: profileImage,
          type: 'image/jpeg', // Assuming JPEG format; adjust as necessary
          name: 'profile.jpg', // The name to use for the image file
        });
      }

      const response = await fetch('https://your-api-endpoint.com/social-circles', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer your-auth-token', // Replace with your actual token
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Social Circle created successfully!');
        navigation.goBack();
      } else {
        throw new Error(result.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
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

      <View style={[styles.profileImageContainer, !profileImage && styles.profileImagePlaceholder]}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <MaterialIcons name="person" size={60} color="white" />
        )}
      </View>
      <TouchableOpacity onPress={selectImage}>
        <Text style={styles.editProfileText}>Add Photo</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={circleName}
          onChangeText={setCircleName}
          placeholder="Social Circle Name"
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          value={description}
          onChangeText={setDescription}
          placeholder="Description and purpose of the group..."
          multiline
          numberOfLines={3}
          maxLength={300}
        />
        <Text style={styles.charCount}>{300 - description.length} characters</Text>
      </View>

      <View style={styles.tagContainer}>
        <TextInput
          style={styles.tagInput}
          value={tagInput}
          onChangeText={setTagInput}
          placeholder="Enter tags..."
          onSubmitEditing={handleAddTag}
        />
        <View style={styles.tagList}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
              <TouchableOpacity onPress={() => handleRemoveTag(tag)}>
                <MaterialIcons name="close" size={16} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.createButton} onPress={handleCreate} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.createButtonText}>Create Social Circle</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 20,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImagePlaceholder: {
    backgroundColor: 'grey',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  editProfileText: {
    color: 'black',
    textAlign: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  descriptionInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  charCount: {
    alignSelf: 'flex-end',
    color: 'gray',
    marginBottom: 15,
  },
  tagContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  tagInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e1e1e1',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    marginRight: 5,
  },
  createButton: {
    backgroundColor: 'black',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
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

export default CreateSocialCircleScreen;
