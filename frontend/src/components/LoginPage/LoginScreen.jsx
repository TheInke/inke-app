// LoginScreen.jsx

/*
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { login } from '../services/api'; // Import login function from api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN } from '../constants';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await login(username, password);
            console.log('LOGIN SUCCESS | ln16');    //testing login

            const accessToken = response.data.access;
            // console.log("THIS IS ACCESS TOKEN", accessToken);  //printing accessToken from the data

            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
            // const storedToken = await AsyncStorage.getItem(ACCESS_TOKEN);
            // console.log('TOKEN STORED IN ASYNC STORAGE:', storedToken);

            // Navigate to the main screen or perform other actions
            navigation.navigate('Main');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;
*/

// LoginScreen.jsx




// src/components/LoginPage/LoginScreen.jsx

import React, { useState, useContext } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../../services/context/authContext';
import InputBox from '../../components/Forms/InputBox';
import SubmitButton from '../../components/Forms/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ACCESS_TOKEN } from '../../services/constants';
import inkeLogo from '../../assets/images/inke_logo.png';

const LoginScreen = ({ navigation }) => {
    // Global state
    const [state, setState] = useContext(AuthContext);

    // Local states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle login
    const handleLogin = async () => {
        try {
            setLoading(true);
            if (!email || !password) {
                Alert.alert("Please Fill All Fields");
                setLoading(false);
                return;
            }

            const { data } = await axios.post("/auth/login", { email, password });
            setState(data);
            await AsyncStorage.setItem("@auth", JSON.stringify(data));

            const accessToken = data.accessToken; // Assuming accessToken is part of the response
            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);

            alert(data && data.message);
            navigation.navigate("Main");
            console.log("Login Data==> ", { email, password });
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
            console.error("Login failed:", error);
        } finally {
            setLoading(false);
        }
    };

    // Temporary function to check local storage data
    const getLocalStorageData = async () => {
        let data = await AsyncStorage.getItem("@auth");
        console.log("Local Storage ==> ", data);
    };
    getLocalStorageData();

    return (
        <View style={styles.container}>
            <Image source={inkeLogo} style={styles.logo} />
            <Text style={styles.title}>Inke</Text>
            <Text style={styles.label}>LOGIN</Text>

            <View style={{ marginHorizontal: 20 }}>
                <InputBox
                    inputTitle={"Email"}
                    keyboardType="email-address"
                    autoComplete="email"
                    value={email}
                    setValue={setEmail}
                />
                <InputBox
                    inputTitle={"Password"}
                    secureTextEntry={true}
                    autoComplete="password"
                    value={password}
                    setValue={setPassword}
                />
            </View>

            <SubmitButton
                btnTitle="Login"
                loading={loading}
                handleSubmit={handleLogin}
            />

            <TouchableOpacity>
                <Text style={styles.link}>Forgot your password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.link}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#000', // Background color
    },
    logo: {
        width: 100,
        height: 150,
        borderRadius: 75,
        marginBottom: -15,
    },
    title: {
        fontSize: 50,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    link: {
        color: '#007BFF',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
