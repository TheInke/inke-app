import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { fetchUserData, updateUserProfile } from '../../services/api'; // Import fetchUserData and updateUserProfile functions from api.js
import { API_URL, ACCESS_TOKEN } from '../../constants'; // Ensure API_URL and ACCESS_TOKEN are correctly imported

const EditProfileScreen = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        id: null,
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        username: '',
        pronouns: '',
        pfp_image: null,
        links: '',
        bio: '',
        city: '',
        state: '',
        country: '',
    });
    const [newUser, setNewUser] = useState({ ...user });
    const navigation = useNavigation();

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const userData = await fetchUserData(); // Fetch user data using the api.js function
            setUser(userData); // Set user state with fetched user data
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setLoading(false); // Ensure loading state is set to false on error
        }
    };

    const handleSave = async () => {
        try {
            const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
            const response = await updateUserProfile(newUser, accessToken); // Update user profile using the api.js function
            console.log('User updated successfully:', response.data);
            navigation.goBack(); // Navigate back after successful update
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    const handleChange = (key, value) => {
        setNewUser({ ...newUser, [key]: value });
    };

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text>Edit Profile</Text>
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginBottom: 10,
                }}
                placeholder="First Name"
                value={newUser.first_name}
                onChangeText={(text) => handleChange('first_name', text)}
            />
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginBottom: 10,
                }}
                placeholder="Last Name"
                value={newUser.last_name}
                onChangeText={(text) => handleChange('last_name', text)}
            />
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginBottom: 10,
                }}
                placeholder="Phone Number"
                value={newUser.phone_number}
                onChangeText={(text) => handleChange('phone_number', text)}
            />
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginBottom: 10,
                }}
                placeholder="Email"
                value={newUser.email}
                onChangeText={(text) => handleChange('email', text)}
            />
            {/* Add more TextInput components for other fields as needed */}

            <Button title="Save Changes" onPress={handleSave} />
        </View>
    );
};

export default EditProfileScreen;
