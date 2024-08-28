import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EditProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Edit Profile Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
    },
});

export default EditProfileScreen;
