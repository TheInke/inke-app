import React, { useEffect, useState, useRef, Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

//import { login } from '../services/api'; // Import login function from api.js
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import { ACCESS_TOKEN } from '../constants';
/*
      borderColor: 'red',
      borderWidth: 3,
 */

export default CheckpointsScreen = () => {

  const size = new Animated.Value(1);
  const instructionFontSize = new Animated.Value(40);  // Font size starts as a large value
  const opacity = new Animated.Value(0);

  useEffect(() => {
    // Animate the ripple effect

    const instructionFontAnimation = Animated.sequence([
      Animated.timing(instructionFontSize, {
        toValue: 60,  // Animate to a slightly larger font size
        duration: 4000,
        useNativeDriver: false,  // Must be false for fontSize animations
      }),
      Animated.timing(instructionFontSize, {
        toValue: 60,
        duration: 1000,
        useNativeDriver: false,  // Must be false for fontSize animations
      }),
      Animated.timing(instructionFontSize, {
        toValue: 40,  // Animate back to original size
        duration: 8000,
        useNativeDriver: false,  // Must be false for fontSize animations
      }),
    ])

    const sizeAnimation = Animated.sequence([
      Animated.timing(size, {
        toValue: 2.5,
        duration: 4000,
        useNativeDriver: true,
      }),
      Animated.timing(size, {
        toValue: 2.5,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(size, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      }),
    ]);

    const opacityAnimation = Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.8,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(
      Animated.parallel([sizeAnimation, opacityAnimation, instructionFontAnimation])
    ).start();
  }, []);

  const { height, width } = Dimensions.get('window');
  const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
    },
    topHalf: {
      alignItems: 'center',
      justifyContent: 'center',
      height: height / 5,
      width: width,
      marginTop: 70,
      paddingTop: 40,
      borderColor: 'blue',
      borderWidth: 5,
    },
    header: {
      color: 'white',
      fontWeight: 'bold',
      margin: 10,
    },
    timerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      marginTop: (154.6 / 2) - 30,
    },
    timer: {
      backgroundColor: 'gray',
      height: 170,
      width: 170,
      borderRadius: 85,
    },
    ripple: {
      position: 'absolute',
      height: 170,
      width: 170,
      borderRadius: 150,
      backgroundColor: 'rgba(211, 211, 211, 0.4)',
      opacity: opacity,
      transform: [
        {
          scale: size
        }
      ],
    },
  });

  return (
    <View style={styles.screenContainer}>
      <View style={styles.topHalf}>
        {/* Use Animated.Text to animate the font size */}
        <Animated.Text style={[styles.header, { fontSize: instructionFontSize }]}>
          Inhale
        </Animated.Text>
      </View>
      <View style={styles.timerContainer}>
        <View style={styles.timer}></View>
        <Animated.View style={styles.ripple} />
      </View>
    </View>
  );
};
