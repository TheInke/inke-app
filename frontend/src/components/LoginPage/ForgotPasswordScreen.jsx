// ForgotPasswordScreen.jsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleResetPassword = async () => {
        try {
            // Call your reset password API here
            console.log('Password reset link sent to:', email);
            // Navigate to the login screen or show a success message
            navigation.navigate('Login');
        } catch (error) {
            console.error('Password reset failed:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/inke_logo.png')} style={styles.logo} />
            <Text style={styles.title}>Reset Password</Text>

            <Text style={styles.label}>Enter your email address to reset your password</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#d3d3d3"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
                <Text style={styles.resetButtonText}>Send Reset Link</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Back to Login</Text>
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
        width: 100,
        height: 150,
        borderRadius: 75,
        marginBottom: -15,
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
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
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
        marginBottom: 20,
    },
    resetButtonText: {
        color: '#000',  //#000  og: #fff
        fontSize: 16,
    },
    link: {
        color: '#007BFF',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});

export default ForgotPasswordScreen;