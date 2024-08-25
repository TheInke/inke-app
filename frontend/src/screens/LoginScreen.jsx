import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';


// Correctly import the images from the local assets folder
import SafeSpaceLogo from '../assets/images/SafeSpace_logo.jpg';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /*
    const startValue = useRef(new Animated.Value(1)).current;
    const endValue = useRef(new Animated.Value(0)).current;

    
    const gradientAnimation = Animated.loop(Animated.sequence([
        Animated.timing(startValue, 
            {
                toValue: 0,
                duration: 5000,
                useNativeDriver: false,
            }),
        Animated.timing(endValue, 
            {
                toValue: 1,
                duration: 5000,
                useNativeDriver: false,
            }),
        Animated.timing(startValue, 
            {
                toValue: 1,
                duration: 5000,
                useNativeDriver: false,
            }),
        Animated.timing(endValue, 
            {
                toValue: 0,
                duration: 5000,
                useNativeDriver: false,
            }),
    ]));

    useEffect(() => {
        gradientAnimation.start();
      }, []);
    
    */

    /*

    const colorAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start the color animation loop when the component is mounted
        const startColorAnimation = Animated.loop(
            Animated.timing(colorAnimation, {
                toValue: 1,
                duration: 10000,
                useNativeDriver: false, // Must be false for background color animations
            })
        );

        startColorAnimation.start();

        // Cleanup animation on unmount
        return () => {
            startColorAnimation.stop();
        };
    }, [colorAnimation]);

    // Interpolating background color values
    const backgroundColor = colorAnimation.interpolate({
        inputRange: [0, 0.33, 0.66, 1],
        outputRange: [
            '#6CBCC0',
            '#65DCC0',
            '#B4C8BD',
            '#6CBCC0',
        ],
    });
    */

    const handleLogin = async () => {
        const data = {
            username,
            password,
        };
        try {
            // Post username and password to token endpoint to receive access and refresh tokens
            const response = await axios.post('http://localhost:8000/api/token/', data);

            const { access, refresh, user_id } = response.data;

            await AsyncStorage.setItem('ACCESS_TOKEN', access);
            await AsyncStorage.setItem('REFRESH_TOKEN', refresh);
            await AsyncStorage.setItem('USER_ID', JSON.stringify(user_id));

            // Navigate to the main screen
            navigation.navigate('Main');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <View style={styles.wrapper}>

            <LinearGradient
                colors={['#5dc8af', '#6CBCC0',]}
                start={[0.5, 0]} end={[0.5, 1]}
                style={styles.gradient}>
                    
                <Image source={SafeSpaceLogo} style={styles.logo} />
                <Text style={styles.title}>SafeSpace</Text>

                <Text style={styles.label}>LOGIN</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="white"
                    value={username}
                    onChangeText={setUsername}
                    selectionColor={'white'}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="white"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    selectionColor={'white'}
                />

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                    <Icon name="google" size={20} color="#fff" style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Log in with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Icon name="facebook" size={20} color="#fff" style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Log in with Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Icon name="apple" size={20} color="#fff" style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Log in with Apple</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.link}>Forgot your password?</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.link}>Don't have an account? Sign Up</Text>
                </TouchableOpacity>

            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
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
        borderColor: 'white',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: 'white',
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
        color: 'rgba(70, 188, 192, 1)',
        fontSize: 16,
    },
    socialButton: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
    },
    socialIcon: {
        marginRight: 10,
    },
    socialButtonText: {
        fontSize: 16,
        color: '#fff',
    },
    link: {
        color: 'white',
        marginTop: 5,
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
