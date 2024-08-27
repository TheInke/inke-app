import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../constants';
import { useState } from 'react';


const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});




export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/api/token/`,
            {
                body:
                {
                    username: username,
                    password: password
                },
                method: 'POST'
            }
        );
        const data = await response.json();
        // Return the entire response object, which includes the data property
        await AsyncStorage.setItem('ACCESS_TOKEN', data.access);
        await AsyncStorage.setItem('REFRESH_TOKEN', data.refresh);


        const expiryTime = Date.now() + (data.expires_in * 1000); // Store expiration time in milliseconds
        await AsyncStorage.setItem('ACCESS_TOKEN_EXPIRY', expiryTime.toString());


        await AsyncStorage.setItem('USER_ID', String(data.user_id));


        return response;
    } catch (error) {
        throw error;
    }
};


export const refreshToken = async () => {
    try {
        const refreshToken = await AsyncStorage.getItem('REFRESH_TOKEN');
        const response = await fetch(`${API_URL}/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });
        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }
        const data = await response.json();
        await storeTokens(data); // Update tokens and expiry time
    } catch (error) {
        console.error('Error refreshing token:', error);
        // Handle token refresh failure (e.g., log out user)
    }
};


export const fetchWithTokenRefresh = async (url, options = {}) => {
    try {
        let accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
        const tokenExpiry = await AsyncStorage.getItem('ACCESS_TOKEN_EXPIRY');

        if (Date.now() >= parseInt(tokenExpiry, 10)) {
            // Token is expired or about to expire
            await refreshToken();
            accessToken = await AsyncStorage.getItem('ACCESS_TOKEN'); // Get new token
        }
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('API request failed');
        }
        return response.json();
    } catch (error) {
        console.error('Error in fetchWithTokenRefresh:', error);
        throw error;
    }
};
/*
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


*/




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
        const token = await AsyncStorage.getItem('ACCESS_TOKEN');
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
