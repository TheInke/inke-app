// MenuScreen.jsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MenuScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MeditationScreen')}>
                <Ionicons name="leaf" size={20} color="#000" style={styles.icon} />
                <Text style={styles.buttonText}>Meditation</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NotificationScreen')}>
                <Ionicons name="notifications" size={20} color="#000" style={styles.icon} />
                <Text style={styles.buttonText}>Notification</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LiveStreamScreen')}>
                <Ionicons name="videocam" size={20} color="#000" style={styles.icon} />
                <Text style={styles.buttonText}>Live Stream</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50, // Adjust to move buttons further down if needed
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        width: '90%',
    },
    icon: {
        marginRight: 10,
    },
    buttonText: {
        fontSize: 18,
    },
});

export default MenuScreen;
