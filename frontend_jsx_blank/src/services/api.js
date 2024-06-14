import axios from "axios"
import { ACCESS_TOKEN } from "./constants"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

require('dotenv').config();

const baseURL = "http://localhost:8000";

const api = axios.create({
    baseURL
})

api.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem(ACCESS_TOKEN);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        } catch (error) {
            console.error('Error retrieving token:', error);
            return config;
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api