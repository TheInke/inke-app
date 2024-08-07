/*
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
        // Return the entire response object, which includes the data property
        return response;
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

export const auth = async () => {
    try {
        const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);

        if (!accessToken) {
            return false; // If no access token found, not authenticated
        }

        const response = await api.get('/api/users/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return true; // If request succeeds, user is authenticated
    } catch (error) {
        console.error('Authentication check failed:', error);
        return false; // If request fails, not authenticated
    }
};

export const fetchUserData = async (userId) => {
    try {
        const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
        const response = await api.get(`/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data; // Return user data fetched from the API
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
*/

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, ACCESS_TOKEN, REFRESH_TOKEN } from '@env';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (username, password) => {
    try {
        const response = await api.post('/api/token/', { username, password });
        return response;
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

export const auth = async () => {
    try {
        const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);

        if (!accessToken) {
            return false; // If no access token found, not authenticated
        }

        const response = await api.get('/api/users/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return true; // If request succeeds, user is authenticated
    } catch (error) {
        console.error('Authentication check failed:', error);
        return false; // If request fails, not authenticated
    }
};

export const fetchUserData = async (userId) => {
    try {
        const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
        const response = await api.get(`/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data; // Return user data fetched from the API
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

export const fetchSearchData = async () => {
    try {
        const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
        const response = await api.get('/api/search/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching search data:', error);
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
