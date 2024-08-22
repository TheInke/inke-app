import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { login } from '../services/api'; // Import login function from api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

//import statements for auth
//import * as Google from 'expo-google-app-auth';
//import * as Facebook from 'expo-facebook';
//import * as AppleAuthentication from 'expo-apple-authentication';

// Correctly import the image from the local assets folder
import inkeLogo from '../assets/images/inke_logo.png';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const data = {
            "username":username,
            "password":password
        }
        try {
            // Post username and password to token endpoint to receive ACCESS and REFRESH
            const response = await axios.post('http://localhost:8000/api/token/', data)
            
            const { access, refresh, user_id} = response.data;
            console.log(user_id);

            await AsyncStorage.setItem('ACCESS_TOKEN', access);
            await AsyncStorage.setItem('REFRESH_TOKEN', refresh);
            await AsyncStorage.setItem('USER_ID', JSON.stringify(user_id));
            console.log('LOGIN SUCCESS | ln16');

            // Navigate to the main screen or perform other actions
            navigation.navigate('Main');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={inkeLogo} style={styles.logo} />
            <Text style={styles.title}>Inke</Text>

            <Text style={styles.label}>LOGIN</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#d3d3d3"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#d3d3d3"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
                <Icon name="google" size = {20} color = "#fff" style = {styles.socialIcon}/>
                <Text style={styles.socialButtonText}>Log in with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
                <Icon name="facebook" size = {20} color = "#fff" style = {styles.socialIcon}/>
                <Text style={styles.socialButtonText}>Log in with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
                <Icon name="apple" size = {20} color = "#fff" style = {styles.socialIcon}/>
                <Text style={styles.socialButtonText}>Log in with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.link}>Forgot your password?</Text>
            </TouchableOpacity>

            <TouchableOpacity>
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
        backgroundColor: '#000',    //#000  og: #fff
    },
    logo: {
        width: 100, // Make the logo larger
        height: 150, // Make the logo larger
        borderRadius: 75, // Make the logo circular
        marginBottom: -15,
    },
    title: {
        fontSize: 50,
        color: '#fff',  //added
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        color: 'white', //added
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: 'white',
    },
    loginButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',    //#fff  og: #000
        borderColor: '#ddd',    //added
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#000',  //#000  og: #fff
        fontSize: 16,
    },
    socialButton: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
    },
    socialIcon: {
        marginRight: 10,
    },
    socialButtonText: {
        fontSize: 16,
        color: '#fff',   //added
    },
    link: {
        color: '#007BFF',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;