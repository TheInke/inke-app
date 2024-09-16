// NotificationScreen.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationScreen = () => (
    <View style={styles.container}>
        <Text style={styles.text}>Welcome to the Notification Screen</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
});

export default NotificationScreen;