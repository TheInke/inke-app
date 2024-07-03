// AuthStatusScreen.jsx

import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { auth, logout } from '../../services/api'; // Import auth and logout from api.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthStatusScreen = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigation = useNavigation(); // Initialize navigation

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const authenticated = await auth();

            if (authenticated) {
                setIsLoggedIn(true);
                console.log('Authenticated');
            } else {
                setIsLoggedIn(false);
                console.log('Not Authenticated');
            }
        } catch (error) {
            setIsLoggedIn(false);
            console.error('Authentication check failed:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
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
