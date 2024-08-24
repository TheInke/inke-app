import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { fetchUserData, updateUserProfile } from '../services/api'; // Import fetchUserData and updateUserProfile functions from api.js
import { API_URL, ACCESS_TOKEN } from '../constants'; // Ensure API_URL and ACCESS_TOKEN are correctly imported

const ConnectionScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You are connected!</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
    },
  });
  
  export default ConnectionScreen;