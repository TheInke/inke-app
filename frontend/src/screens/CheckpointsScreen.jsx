import React, { useState, useRef } from 'react';
import { View, TextInput, Button, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';

//import { login } from '../services/api'; // Import login function from api.js
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import { ACCESS_TOKEN } from '../constants';


const CheckpointsScreen = () => {
    const rippleSize = useRef(new Animated.Value(100)).current; // Start with a scale of 1 (same size as the gray circle)
    const rippleOpacity = useRef(new Animated.Value(1)).current;
  
    const handlePress = () => {
      rippleSize.setValue(100); // Reset scale to 1
      rippleOpacity.setValue(1);
      Animated.parallel([
        Animated.timing(rippleSize, {
          toValue: 400, // Scale up to 4 times the original size
          duration: 600, // Duration of the animation
          useNativeDriver: false,
        }),
        Animated.timing(rippleOpacity, {
          toValue: 0, // Fade out to opacity 0
          duration: 600, // Duration of the fade-out effect
          useNativeDriver: true,
        }),
      ]).start();
    };
  
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handlePress}>
          <View style={styles.circle}>
            <Animated.View style={[styles.ripple, {
                width: rippleSize,
                height: rippleSize,
                borderRadius: Animated.divide(rippleSize, 2), // Dynamically adjust borderRadius
                opacity: rippleOpacity,
            }]} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
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
      width: 100,  // Initial size of the ripple, larger than the circle
      height: 100,
      borderRadius: 50, // Half of the width/height to make it a circle
      backgroundColor: 'rgba(211, 211, 211, 0.5)', // Light gray color for the ripple effect
    },
  });

export default CheckpointsScreen;
