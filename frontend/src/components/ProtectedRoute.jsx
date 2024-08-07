// ProtectedRoute.jsx

/*
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ACCESS_TOKEN } from '../constants';

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
            if (accessToken) {
                setIsLoggedIn(true);
                setLoading(false);
                navigation.navigate('SearchScreen')
            } else {
                setIsLoggedIn(false);
                setLoading(false);
                navigation.navigate('LoginScreen'); // Redirect to login screen if not authenticated
            }
        } catch (error) {
            setIsLoggedIn(false);
            setLoading(false);
            console.error('Error checking authentication status:', error);
        }
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

    return isLoggedIn ? <>{children}</> : null;
};

export default ProtectedRoute;
*/

// ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ACCESS_TOKEN } from '../constants';

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
            if (accessToken) {
                setIsLoggedIn(true);
                setLoading(false);
                navigation.navigate('SearchScreen'); // Redirect to SearchScreen if authenticated
            } else {
                setIsLoggedIn(false);
                setLoading(false);
                navigation.navigate('LoginScreen'); // Redirect to login screen if not authenticated
            }
        } catch (error) {
            setIsLoggedIn(false);
            setLoading(false);
            console.error('Error checking authentication status:', error);
        }
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

    return isLoggedIn ? <>{children}</> : null;
};

export default ProtectedRoute;





