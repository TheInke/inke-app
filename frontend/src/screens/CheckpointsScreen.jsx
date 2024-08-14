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

const Ripple = () => {
  // useEffect( () => {}, [])
}



export default CheckpointsScreen = () => {

  const size = new Animated.Value(1)
  const instructionFontSize = new Animated.Value(40)
  const opacity = new Animated.Value(0)

  useEffect(() => {
    // Animate the ripple effect
    
    const instructionFontAnimation = Animated.sequence([
      Animated.timing(instructionFontSize, {
        toValue: 1.05,
        duration: 4000,
        useNativeDriver: true,
      }),
      Animated.timing(instructionFontSize, {
        toValue: 1.05,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(instructionFontSize, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      }),
    ])
    
    const sizeAnimation = Animated.sequence([
      Animated.timing(size, {
        toValue: 2.5,
        // this duration value will be a variable dependent on how long the user
        // would like to hold their breath in, or not -- can also be set types
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
    ])
    
    const opacityAnimation = Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0,  // Initial delay to keep opacity at 0 for 1 second
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.8,  // Opacity goes from 0 to 1 in 1 second
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(
      Animated.parallel([sizeAnimation, opacityAnimation, instructionFontAnimation])
    ).start();
  }, []); 

  const { height, width } = Dimensions.get('window');
  const styles = StyleSheet.create
    (
      {
        screenContainer:
        {
          flex: 1,
          backgroundColor: 'black',
          alignItems: 'center',
        },
        topHalf:
        {
          alignItems: 'center',
          justifyContent: 'center',
          height: height / 5,
          width: width,
          marginTop: 70,
          paddingTop: 40,

          borderColor: 'blue',
          borderWidth: 5,
        },
        // 
        header:
        {
          color: 'white',
          fontSize: instructionFontSize,
          fontWeight: 'bold',
          margin: 10,
        },
        timerContainer:
        {
          height: 'flex-start',
          width: 'flex-start',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,

          marginTop: (154.6 / 2) - 30,
        },

        timer:
        {
          backgroundColor: 'gray',
          height: 170,
          width: 170,
          borderRadius: 85,
        },

        ripple:
        {
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
      }
    )

  return (
    <View style={styles.screenContainer}>
      <View style={styles.topHalf}>
        <Text style={styles.header}>Inhale</Text>
      </View>
      <View style={styles.timerContainer}>
        <View style={styles.timer}></View>
        
        <Animated.View style={styles.ripple} />

        {/* We can also add several ripples and give them a delay parameter to create a more involved ripple effect */}
        
        
      </View>

    </View>
  );

  

};




