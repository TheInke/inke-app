import React, { useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { invertColor } from '../InvertColor.js'

export default CheckpointsScreen = () => {

  const [isDarkMode, setIsDarkMode] = useState(false);

  /*
  const size = new Animated.Value(1);
  const instructionFontSize = new Animated.Value(40);
  const opacity = new Animated.Value(0);
  */

  // Note:
  // Without the usage of useRef, the values of size, opacity and animatedFontSize are improperly maintained
  // and may not work as intended. In this case, the animations simply did not run without the usage of useRef
  const size = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.4)).current;
  const animatedFontSize = useRef(new Animated.Value(40)).current;

  const [countDown, setCountDown] = useState(1);

  const instructionText = [
    {instruction:'Drag the timer to choose duration. Release to start.', fontSize: 25},
    {instruction:'Inhale', fontSize: animatedFontSize},
    {instruction:'Hold', fontSize: animatedFontSize},
    {instruction:'Exhale', fontSize: animatedFontSize},
  ]

  const [instructionTextIndex, setInstructionTextIndex] = useState(0);
  const [animationRunning, setAnimationRunning] = useState(false);  // Track animation state

  // Function to start the animation
  const startAnimation = () => {
    
    // Note:
    // Animated.sequence() and Animated.loop() do not recognize animations if they are made functions
    // Below, I have simply initialized them as components
    
    const inhaleAnimation = 
      Animated.timing(animatedFontSize, {
        toValue: 60,
        duration: 4000,
        useNativeDriver: false,
        // setInstructionTextIndex(1);
      });
    
    const holdAnimation = 
      Animated.timing(animatedFontSize, {
        toValue: 60,
        duration: 7000,
        useNativeDriver: false,
        // setInstructionTextIndex(2);
      });

    const exhaleAnimation = 
      Animated.timing(animatedFontSize, {
        toValue: 40,
        duration: 8000,
        useNativeDriver: false,
        // setInstructionTextIndex(3);
      });
    
    // Handles expanding and shrinking instruction text (ex: inhale, exhale, hold)
    
    const instructionFontAnimation = Animated.sequence([
      inhaleAnimation,
      holdAnimation,
      exhaleAnimation,
    ]);

    // Controls size of the expanding and contracting circle, over the course of the breathing session
    const sizeAnimation = Animated.sequence([
      Animated.timing(size, {
        toValue: 2.5,
        duration: 4000,
        useNativeDriver: true,
      }),
      Animated.timing(size, {
        toValue: 2.5,
        duration: 7000,
        useNativeDriver: true,
      }),
      Animated.timing(size, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      }),
    ]);

    // We will handle parallel loop for opacity flashing at t=4000 separately (due to nesting issues):

    const opacityFlashingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, 
          {
            toValue: 0.7,
            duration: 400,
            useNativeDriver: true,
          }),
        Animated.timing(opacity, 
          {
            toValue: 0.4,
            duration: 600,
            useNativeDriver: true,
          }),
      ]),
      {
        iterations: 7,
      }
    );

    const opacityLoop = Animated.sequence([
      Animated.delay(4000),
      opacityFlashingAnimation,
      Animated.delay(8000)
    ]);

    // Handles sizing and changing instruction loop
    Animated.loop(
      Animated.parallel([sizeAnimation, opacityLoop, instructionFontAnimation])
    ).start(); 
  };

  // Stop the animation by resetting the values
  const stopAnimation = () => {
    
    size.stopAnimation();
    size.setValue(1);

    opacity.stopAnimation();
    opacity.setValue(0.4);

    animatedFontSize.stopAnimation();
    animatedFontSize.setValue(40);

  };

  // Handle the tap event
  const handleTap = () => {
    setInstructionTextIndex(1);
  
    if (animationRunning) {
      setInstructionTextIndex(1);
      stopAnimation();  // Stop animation if running
    } else {
      startAnimation();  // Start animation if stopped
    }
    setAnimationRunning(!animationRunning);  // Toggle animation state
  };

  const { height, width } = Dimensions.get('window');
  const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: isDarkMode ? invertColor('#FFFFFF') : '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    topHalf: {
      
      /*
      borderColor: 'red',
      borderWidth: 3,
      */
      
      alignItems: 'center',
      justifyContent: 'top',
      height: 'fit-content',
      width: width,
      paddingHorizontal: 20,
      marginBottom: 20,
      
    },
    header: {
      color: isDarkMode ? invertColor('#000000') : '#000000',
      fontWeight: 'bold',
      textAlign: 'center',
      zIndex: 10,
    },
    timerContainer: {
      
      /*
      borderColor: 'green',
      borderWidth: 3,
      */
      
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      // marginTop: (154.6 / 2) - 30,
      zIndex: 1

      //borderColor: 'blue',
      //borderWidth: 5,
    },
    timer: {
      
      /*
      borderColor: 'red',
      borderWidth: 5,
      */

      alignItem: 'center',
      justifyContent: 'center',
      backgroundColor: isDarkMode ? 'gray' : 'black',
      height: 170,
      width: 170,
      borderRadius: 85,
      zIndex: 2,  // Ensure touch is captured
    },
    countDown: 
    {
      alignSelf: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: 40,
      fontWeight: 'bold'
    },
    ripple: {
      position: 'absolute',
      height: 170,
      width: 170,
      borderRadius: 150,
      backgroundColor: isDarkMode ? 'rgba(211, 211, 211, 0.4)' : 'rgba(153, 204, 255, 1)',
      opacity: opacity,
      transform: [{ scale: size }],
      zIndex: -3,  // Make sure it's behind the timer for tap functionality
      elevation: -3
    },
    touchable:
    {
      zIndex: 3
    },
    sampleText:
    {
      color: 'white'
    }
  });

  return (
    <View style={styles.screenContainer}>
      
      <View style={styles.topHalf}>
        <Animated.Text style={[styles.header, { fontSize: instructionText[instructionTextIndex].fontSize }]}>
          {instructionText[instructionTextIndex].instruction}
        </Animated.Text>
      </View>

        <View style={styles.timerContainer}>
          <TouchableOpacity style={styles.touchable} activeOpacity={0.8} onPress={handleTap}>
            <View style={styles.timer}>
              <Text style={styles.countDown}>{ countDown }</Text>
            </View>
          </TouchableOpacity>
          <Animated.View style={styles.ripple} />
        </View>
    </View>
  );
};
