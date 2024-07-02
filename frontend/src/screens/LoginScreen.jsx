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





import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { login } from '../services/api'; // Import login function from api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN } from '../constants';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await login(username, password);
            console.log('LOGIN SUCCESS | ln16');    // Testing login

            const accessToken = response.data.access;
            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);

            // Navigate to the main screen or perform other actions
            navigation.navigate('Main');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={'../assets/images/inke_logo.png'} style={styles.logo} />
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
                <Text style={styles.socialButtonText}>Log in with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Log in with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Log in with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity>
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
        width: 60,
        height: 80,
        marginBottom: -5,
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
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
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






