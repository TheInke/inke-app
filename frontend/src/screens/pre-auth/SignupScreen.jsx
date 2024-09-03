import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { signup } from '../../services/api'; // Import signup function from api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN } from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import ssLogo from '../../assets/images/SafeSpaceLogo.png'; // Importing the logo

const SignupScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const response = await signup(username, email, password);
            console.log('SIGNUP SUCCESS | ln16');

            const accessToken = response.data.accessToken;
            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);

            // Navigate to the main screen or perform other actions
            navigation.navigate('Main');
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={ssLogo} style={styles.logo} />
            <Text style={styles.title}>SafeSpace</Text>
            <Text style={styles.beta}>Beta</Text>

            <Text style={styles.label}>SIGN UP</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#d3d3d3" // Soft placeholder color
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#d3d3d3"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#d3d3d3"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Already have an account? Log In</Text>
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
    signupButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20,
    },
    signupButtonText: {
        color: '#57C2B5', // Use the same shade for text as the button background color
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        color: '#fff',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});

export default SignupScreen;