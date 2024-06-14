import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function HomePage({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>This is the Home Page</Text>
            <Button
                title="Go to Example Screen"
                onPress={() => navigation.navigate('Example')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Replace with your preferred background color
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
    },
});