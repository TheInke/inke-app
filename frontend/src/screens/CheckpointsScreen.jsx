import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';

//import { login } from '../services/api'; // Import login function from api.js
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import { ACCESS_TOKEN } from '../constants';


const CheckpointsScreen = () => {

  const rippleSize = useRef(new Animated.Value(100)).current;
  const rippleOpacity = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    rippleSize.setValue(100);
    rippleOpacity.setValue(1);
    Animated.parallel([
      Animated.timing(rippleSize, {
        toValue: 200, // Scale up to full size
        duration: 4000, // Duration of the animation
        useNativeDriver: false,
      }),
      Animated.timing(rippleOpacity, {
        toValue: 0,
        duration: 500, // Duration of the fade-out effect
        useNativeDriver: true,
      }),
    ]).start();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    },
    circle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: 'rgba(128, 128, 128, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    ripple: {
      position: 'absolute',
      width: rippleSize,  // Initial size of the ripple
      height: rippleSize,
      opacity: rippleOpacity,
      borderRadius: 50,
      backgroundColor: 'rgba(211, 211, 211, 0.5)', // Light gray color for the ripple effect
    },
  });


  return (
    <View style={styles.container}>

      <View style={styles.circle}>
        <Text>hi</Text>
      </View>

      <TouchableWithoutFeedback onPress={handlePress}>
        <Animated.View
          style={styles.ripple}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};



export default CheckpointsScreen;
