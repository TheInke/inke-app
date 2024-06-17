import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';


const ProtectedRoute = ({children}) => 
{
    const [isAuthorized, setIsAuthorized] = useState(null);
    const navigation = useNavigation();

    useEffect( () => {
        auth().catch( () => setIsAuthorized(false));
    }, []);

    const refreshToken = async () => 
    {
        const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post('/api/token/refresh', {
                refresh: refreshToken
            });
            if (res.status === 200){
                await AsyncStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };


    const auth = async () => 
    {
        const token = await AsyncStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true)
        }
    };


    if (isAuthorized === null){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff"/>
                <Text>Loading...</Text>
            </View>
        );
    }
    
    if (!isAuthorized) {
        navigation.navigate('LoginPage');
        return null
    }
    
    return (
        <View style={{ flex: 1}}>
            {children}
        </View>
    );
};

export default ProtectedRoute;