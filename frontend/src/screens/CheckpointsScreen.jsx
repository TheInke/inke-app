import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import Animated, {interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

//import { login } from '../services/api'; // Import login function from api.js
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import { ACCESS_TOKEN } from '../constants';


const Ripple = ({ delay }) => 
{
  const ripple = useSharedValue(0);
  useAnimatedStyle( () => {
    return {
      opacity: 0.8 - ripple.value,
      transform: [
        {
          scale: interpolate(ring.value, )
        },
      ],
    };
  });

  return <Animated.View style={styles.ring}/>
}
    


export default function CheckpointsScreen() 
{
  <View style={styles.container}>
    <Ripple />
  </View>
};

const styles = StyleSheet.create
(
  {
    container: 
    {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black'
    },
    ring: 
    {
      position: absolute,
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: 'gray',
    }
  }
)

