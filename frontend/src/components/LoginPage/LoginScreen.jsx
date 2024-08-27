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



/*import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { login } from '../../services/api'; // Import login function from api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN } from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome';

// Correctly import the image from the local assets folder
import inkeLogo from '../../assets/images/inke_logo.png';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // Log the username and password to the console
            console.log('Username:', username);
            console.log('Password:', password);

            // Send the login request
            const response = await login(username, password);
            console.log('LOGIN SUCCESS | inke');

            const accessToken = response.data.accessToken;
            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);

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
        backgroundColor: '#000',
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
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: '#fff',
    },
    loginButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#000',
        fontSize: 16,
    },
    link: {
        color: '#007BFF',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
*/

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { login } from '../../services/api'; // Import login function from api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN } from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome';

//import statements for auth
//import * as Google from 'expo-google-app-auth';
//import { signInWithGoogle } from '@/lib/auth';
//import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
//import * as AppleAuthentication from 'expo-apple-authentication';

// Correctly import the image from the local assets folder
import ssLogo from '../../assets/images/SafeSpaceLogo.png';


const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await login(username, password);
            const accessToken = response.data.accessToken;
            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
            navigation.navigate('Main');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    //API integration: Google Auth
    /*
    const handleGoogleLogin = async () => {
        try {
            const result = await Google.logInAsync({
                //androidClientId: '',    //get client id
                //iosClientId: '',        //get client id
                webClientId: '699989176848-hcsepqcl3i6b02cuflk3blqio6mdu7cd.apps.googleusercontent.com',          //get client id
                scopes: ['profile', 'email'],
            });

            if(result.type === 'success') {
                const accessToken = result.accessToken;
                await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
                navigation.navigate('Main');
            } else {
                console.error('Google login cancelled');
            }
        } catch (error) {
            console.error('Google login error', error);
        }
    };
    */


    //API integration: Apple Auth
    /*
    const handleAppleLogin = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL,],
            });
            if (credential) {
                const accessToken = credential.identityToken;
                await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
                navigation.navigate('Main');
            }
        } catch (error) {
            console.error('Apple login error', error);
        }
    };
    */

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0}
        >
            <View style={styles.container}>
                <Image source={ssLogo} style={styles.logo} />
                <Text style={styles.title}>SafeSpace</Text>
                <Text style={styles.beta}>Beta</Text>

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

                {/*
                <TouchableOpacity style={styles.socialButton} onPress = {handleGoogleLogin}>
                    <Icon name="google" size={20} color="#fff" style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Log in with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} onPress = {handleFacebookLogin}>
                    <Icon name="facebook" size={20} color="#fff" style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Log in with Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} onPress = {handleAppleLogin}>
                    <Icon name="apple" size={20} color="#fff" style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Log in with Apple</Text>
                </TouchableOpacity>
                */}

                <TouchableOpacity>
                    <Text style={styles.link}>Forgot your password?</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.link}>Don't have an account? Sign Up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#66D0C5', // Match the background color from the image
    },
    logo: {
        width: 200, // Adjust logo size for better fit
        height: 200, // Adjust logo size for better fit
        marginBottom: -50,
    },
    title: {
        fontSize: 40,
        color: '#fff',
        fontWeight: 'bold',
    },
    beta: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        color: '#fff',
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
        color: '#fff',
        backgroundColor: '#57C2B5', // Slightly darker background to match design
    },
    loginButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#57C2B5', // Use the same shade for text as the button background color
        fontSize: 16,
        fontWeight: 'bold',
    },
    socialButton: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#57C2B5', // Match button color with overall design
    },
    socialIcon: {
        marginRight: 10,
    },
    socialButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    link: {
        color: '#fff',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;