import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import {interpolate, useAnimatedStyle, useSharedValue, withDelay, withTiming} from 'react-native-reanimated'

//import { login } from '../services/api'; // Import login function from api.js
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import { ACCESS_TOKEN } from '../constants';


const Ripple = ({ delay }) => 
{
  const ripple = useSharedValue(0);
  const style = useAnimatedStyle( () => {
    return {
      opacity: 0.8 - ripple.value,
      transform: [
        {
          scale: interpolate(ripple.value, [0,1], [0,4]),
        },
      ],
    };
  });

  useEffect( () => {
    ripple.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 4000,
        }),
        -1
    )
    );
  }, []);
  
  return <Animated.View style={[styles.ripple, style]}/>
}
    


export default CheckpointsScreen = () => {
  <View style={styles.container}>
    <Ripple delay={0}/>
    <Ripple delay={1000}/>
    <Ripple delay={2000}/>
    <Ripple delay={3000}/>
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
    ripple: 
    {
      position: absolute,
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: 'gray',
    }
  }
)

