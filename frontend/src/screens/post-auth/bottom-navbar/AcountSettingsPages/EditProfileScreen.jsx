import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserField } from '../../../../services/fetchUserField'; // We will fetch USER_ID using this function
import { API_URL } from '../../../../constants'; // Replace with your actual API URL

export default function EditProfileScreen({ navigation }) {
  const userId = fetchUserField('id');  // Fetching the user ID (assuming 'id' returns USER_ID)
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [links, setLinks] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userId) {
        try {
          const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
          
          const response = await fetch(`${API_URL}/users/${userId}/`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setName(data.first_name || '');
            setUsername(data.username || '');
            setEmail(data.email || '');
            setLinks(data.links || '');
            setBio(data.bio || '');
            setProfileImage(data.pfp_image || null);  // Set profile image if available
          } else {
            console.error('Failed to fetch profile data');
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    fetchUserProfile();
  }, [userId]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
      
      const formData = new FormData();
      if (profileImage) {
        formData.append('pfp_image', {
          uri: profileImage,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });
      }

      formData.append('first_name', name);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('links', links);
      formData.append('bio', bio);

      const response = await fetch(`${API_URL}/users/${userId}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        console.log('Profile updated successfully');
        navigation.goBack();  // Navigate back after saving
      } else {
        console.error('Failed to update profile:', response.status);
      }
    } catch (error) {
      console.error('Error while updating profile:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileImageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Text>No Image</Text>
        )}
      </View>

      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.editProfileText}>Edit Profile Image</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Links</Text>
        <TextInput
          style={styles.input}
          value={links}
          onChangeText={setLinks}
          placeholder="Enter your links"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Bio</Text>
        <TextInput
          style={[styles.input, styles.bioInput]}
          value={bio}
          onChangeText={setBio}
          placeholder="Enter your bio"
          multiline
          numberOfLines={3}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editProfileText: {
    color: 'blue',
    textAlign: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  bioInput: {
    height: 60,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: 'black',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

