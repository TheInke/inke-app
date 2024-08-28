import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import EditNameScreen from './EditProfilepages/EditNameScreen';
import EditUsernameScreen from './EditProfilepages/EditUsernameScreen';
import EditEmailScreen from './EditProfilepages/EditEmailScreen';
import EditLinksScreen from './EditProfilepages/EditLinksScreen';
import EditBioScreen from './EditProfilepages/EditBioScreen';

// Define a Stack Navigator
const ProfileStack = createStackNavigator();

const EditProfileMainScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);

  // Function to handle image selection
  const selectImage = () => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        { text: 'Camera', onPress: openCamera },
        { text: 'Gallery', onPress: openGallery },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const openCamera = () => {
    launchCamera({ mediaType: 'photo', cameraType: 'front' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: profileImage || 'https://example.com/profile-image.png' }} 
        style={styles.profileImage} 
      />
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

// Main component to handle all navigation
const EditProfileScreen = () => {
  return (
    <NavigationContainer independent={true}>
      <ProfileStack.Navigator initialRouteName="EditProfileMainScreen">
        <ProfileStack.Screen 
          name="EditProfileMainScreen" 
          component={EditProfileMainScreen} 
          options={{ headerShown: false }} 
        />
        <ProfileStack.Screen name="EditNameScreen" component={EditNameScreen} />
        <ProfileStack.Screen name="EditUsernameScreen" component={EditUsernameScreen} />
        <ProfileStack.Screen name="EditEmailScreen" component={EditEmailScreen} />
        <ProfileStack.Screen name="EditLinksScreen" component={EditLinksScreen} />
        <ProfileStack.Screen name="EditBioScreen" component={EditBioScreen} />
      </ProfileStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editProfileText: {
    color: 'blue',
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
});

export default EditProfileScreen;
