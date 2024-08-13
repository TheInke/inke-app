import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Optional: to decode and check JWT expiry

const ProtectedRoute = ({ children, navigation }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = await AsyncStorage.getItem('ACCESS_TOKEN');
            console.log(token);

            if (token) {
                // Optionally check token expiry
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    // Token expired, attempt to refresh
                    await refreshAccessToken();
                } else {
                    setIsAuthenticated(true);
                }
            } else {
                // No token, redirect to login
                navigation.navigate('Login');
            }

            setLoading(false);
        };

        
        checkAuthentication();

        // Set up the interval to refresh the token every 30 minutes (1800000 ms)
        const intervalId = setInterval(async () => {
            await refreshAccessToken();
        }, 1800000);

        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, []);

    const refreshAccessToken = async () => {
        try {
            const refreshToken = await AsyncStorage.getItem('REFRESH');
            if (!refreshToken) {
                // If there's no refresh token, redirect to login
                navigation.navigate('Login');
                return;
            }

            const response = await axios.post('https://your-api.com/refresh-token', {
                refresh: refreshToken,
            });

            const newAccessToken = response.data.access_token;
            await AsyncStorage.setItem('ACCESS_TOKEN', newAccessToken);

            setIsAuthenticated(true);
        } catch (error) {
            console.error('Failed to refresh access token:', error);
            // Handle errors, e.g., redirect to login if refresh fails
            navigation.navigate('Login');
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return isAuthenticated ? children : null;
};

export default ProtectedRoute;