// LiveStreamScreen.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LiveStreamScreen = () => (
    <View style={styles.container}>
        <Text style={styles.text}>Welcome to the Live Stream Screen</Text>
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

export default LiveStreamScreen;
