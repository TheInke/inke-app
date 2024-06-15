import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { API_URL, ACCESS_TOKEN } from '@env';

const EditProfileScreen = () => {
    const [profileData, setProfileData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        username: '',
        password: '',
        pronouns: '',
        pfp_image: '',
        links: '',
        bio: '',
        city: '',
        state: '',
        country: '',
    });
    const [userId, setUserId] = useState(null); // Set this appropriately if known

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = await AsyncStorage.getItem(ACCESS_TOKEN);
            const storedUserId = await AsyncStorage.getItem('userId'); // Adjust according to how userId is stored
            if (token) {
                const response = await axios.get(
                    `${API_URL}/api/users/`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setProfileData(response.data);
                setUserId(storedUserId);
            }
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const token = await AsyncStorage.getItem(ACCESS_TOKEN);
            if (token && userId) {
                const response = await axios.put(
                    `${API_URL}/api/users/${userId}/`,
                    profileData,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                console.log('Profile updated successfully:', response.data);
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    const handleChange = (key, value) => {
        setProfileData({
            ...profileData,
            [key]: value,
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={profileData.first_name}
                onChangeText={(value) => handleChange('first_name', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={profileData.last_name}
                onChangeText={(value) => handleChange('last_name', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={profileData.phone_number}
                onChangeText={(value) => handleChange('phone_number', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={profileData.email}
                onChangeText={(value) => handleChange('email', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={profileData.username}
                onChangeText={(value) => handleChange('username', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={profileData.password}
                onChangeText={(value) => handleChange('password', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Pronouns"
                value={profileData.pronouns}
                onChangeText={(value) => handleChange('pronouns', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Profile Image URL"
                value={profileData.pfp_image}
                onChangeText={(value) => handleChange('pfp_image', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Links"
                value={profileData.links}
                onChangeText={(value) => handleChange('links', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Bio"
                value={profileData.bio}
                onChangeText={(value) => handleChange('bio', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="City"
                value={profileData.city}
                onChangeText={(value) => handleChange('city', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="State"
                value={profileData.state}
                onChangeText={(value) => handleChange('state', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Country"
                value={profileData.country}
                onChangeText={(value) => handleChange('country', value)}
            />
            <Button title="Update Profile" onPress={handleUpdateProfile} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        width: '100%',
    },
});

export default EditProfileScreen;
