import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, ACCESS_TOKEN, REFRESH_TOKEN } from '@env'; // Import from @env

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (username, password) => {
    try {
        const response = await api.post('/api/token/', { username, password });
        const { access, refresh } = response.data;
        await AsyncStorage.setItem(ACCESS_TOKEN, access);
        await AsyncStorage.setItem(REFRESH_TOKEN, refresh);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const refreshToken = async () => {
    try {
        const refresh_token = await AsyncStorage.getItem(REFRESH_TOKEN);
        const response = await api.post('/api/token/refresh/', {
            refresh: refresh_token,
        });
        const { access } = response.data;
        await AsyncStorage.setItem(ACCESS_TOKEN, access);
        return access;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        await AsyncStorage.removeItem(ACCESS_TOKEN);
        await AsyncStorage.removeItem(REFRESH_TOKEN);
    } catch (error) {
        throw error;
    }
};

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
