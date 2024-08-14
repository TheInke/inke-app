import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native';

//import { login } from '../services/api'; // Import login function from api.js
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import { ACCESS_TOKEN } from '../constants';

export default CheckpointsScreen = () => {
  
  return (
    <View style={styles.screenContainer}>
      <View style={styles.topHalf}>
        <Text style={styles.header}>Drag the circle to adjust duration of this session</Text>
      </View>
    </View>
  );
  
};


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
      borderColor: 'red',
      borderWidth: 3,
    },
    header:
    {
      color: 'white',
      fontSize: 30,
      margin: 40,
    },
    circle:
    {
      backgroundColor: 'gray',
      height: 170,
      width: 170,
      borderRadius: 85,
    }
  }
)

