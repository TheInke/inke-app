import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { API_URL, ACCESS_TOKEN } from '@env';

const AuthStatusScreen = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigation = useNavigation(); // Initialize navigation

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);

            if (accessToken) {
                const response = await axios.get(`${API_URL}/api/users/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setIsLoggedIn(true);
                console.log('Authenticated:', response.data);
            } else {
                setIsLoggedIn(false);
                console.log(
                    'Not Authenticated: No access token or user ID found'
                );
            }
        } catch (error) {
            setIsLoggedIn(false);
            console.error('Authentication check failed:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem(ACCESS_TOKEN);
            setIsLoggedIn(false);
            console.log('Logged out successfully');
            navigation.navigate('LoginScreen'); // Navigate to LoginScreen on logout
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{isLoggedIn ? 'Authenticated' : 'Not Authenticated'}</Text>
            {isLoggedIn && <Button title="Logout" onPress={handleLogout} />}
        </View>
    );
};

export default AuthStatusScreen;
