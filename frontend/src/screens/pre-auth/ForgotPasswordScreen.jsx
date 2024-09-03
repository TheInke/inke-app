// ForgotPasswordScreen.jsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import SafeSpaceLogo from '../../assets/images/SafeSpaceLogo.png';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleResetPassword = async () => {

        const data = {
            "email": email
        };

        try {

            console.log(email)
            // the localhost needs to be changed to the server during production
            const response = await axios.post('http://127.0.0.1:8000/api/forgot-password/', data);

            console.log('Response:', response.data);

            // Call your reset password API here
            console.log('Password reset link sent to:', email);
            // Navigate to the login screen or show a success message
            navigation.navigate('Login');

        } catch (error) {
            console.error('Password reset failed:', error);
        }

    };

    return (
        <View style={styles.wrapper}>
            <LinearGradient
                colors={['#5dc8af', '#6CBCC0',]}
                start={[0.5, 0]} end={[0.5, 1]}
                style={styles.gradient}>
                <Image source={SafeSpaceLogo} style={styles.logo} />
                <Text style={styles.title}>Reset Password</Text>

                <Text style={styles.label}>Enter your email address to reset your password</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="white"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    selectionColor={'white'}
                />

                <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
                    <Text style={styles.resetButtonText}>Send Reset Link</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Back to Login</Text>
                </TouchableOpacity>
            </LinearGradient>
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
    wrapper: {
        flex: 1, // Ensure the outer View takes up the full screen
    },
    gradient: {
        flex: 1, // Ensure the gradient fills the container
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    logo: {
        width: 110,
        height: 110,
        borderRadius: 55,
        marginBottom: 8,
    },
    title: {
        fontSize: 45,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        marginTop: 10,
        color: '#fff', // added to make the text visible on dark background
    },
    resetButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',    //#fff  og: #000
        borderColor: '#ddd',    //added
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 5,
    },
    resetButtonText: {
        color: '#6CBCC0',  //#000  og: #fff
        fontSize: 16,
    },
    link: {
        color: 'white',
        marginTop: 5,
        textDecorationLine: 'underline',
    },
});

export default ForgotPasswordScreen;