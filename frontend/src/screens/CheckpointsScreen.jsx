import React, { useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, FlatList} from 'react-native';

export default CheckpointsScreen = () => {
  /*
  const size = new Animated.Value(1);
  const instructionFontSize = new Animated.Value(40);
  const opacity = new Animated.Value(0);
  */

  const size = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const animatedFontSize = useRef(new Animated.Value(40)).current;

  const instructionText = [
    {instruction:'Drag the timer to choose duration.\nRelease to start.', fontSize: 20},
    {instruction:'Inhale', fontSize: animatedFontSize},
    {instruction:'Hold', fontSize: animatedFontSize},
    {instruction:'Exhale', fontSize: animatedFontSize},
  ]

  const [instructionTextIndex, setInstructionTextIndex] = useState(0);

  const [animationRunning, setAnimationRunning] = useState(false);  // Track animation state

  // Function to start the animation
  const startAnimation = () => {
    
    const inhaleAnimation = () => 
    {
      setInstructionTextIndex(1);
      Animated.timing(animatedFontSize, {
        toValue: 60,
        duration: 4000,
        useNativeDriver: false,
      })
    }
    const holdAnimation = () => 
    {
      setInstructionTextIndex(2);
      Animated.timing(animatedFontSize, {
        toValue: 60,
        duration: 1000,
        useNativeDriver: false,
      })
    }
    const exhaleAnimation = () => 
    {
      setInstructionTextIndex(3);
      Animated.timing(animatedFontSize, {
        toValue: 40,
        duration: 8000,
        useNativeDriver: false,
      })
    }

    const instructionFontAnimation = Animated.sequence([
      inhaleAnimation,
      holdAnimation,
      exhaleAnimation,
    ]);

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
  };

  // Stop the animation by resetting the values
  const stopAnimation = () => {
    
    size.stopAnimation();
    size.setValue(1);
    opacity.stopAnimation();
    opacity.setValue(1);
    animatedFontSize.stopAnimation();
    animatedFontSize.setValue(40);
  };

  // Handle the tap event
  const handleTap = () => {
    console.log(animationRunning);
    if (animationRunning) {
      console.log('trying stopAnimation');
      stopAnimation();  // Stop animation if running
    } else {
      console.log('trying startAnimation');
      startAnimation();  // Start animation if stopped
    }
    setAnimationRunning(!animationRunning);  // Toggle animation state
  };

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
      zIndex: 1

      //borderColor: 'blue',
      //borderWidth: 5,
    },
    timer: {
      backgroundColor: 'gray',
      height: 170,
      width: 170,
      borderRadius: 85,
      zIndex: 2,  // Ensure touch is captured
    },
    ripple: {
      position: 'absolute',
      height: 170,
      width: 170,
      borderRadius: 150,
      backgroundColor: 'rgba(211, 211, 211, 0.4)',
      opacity: opacity,
      transform: [{ scale: size }],
      zIndex: -1,  // Make sure it's behind the timer for tap functionality
      elevation: -1
    },
    touchable:
    {
      zIndex: 3
    },
  });

  return (
    <View style={styles.screenContainer}>
      <View style={styles.topHalf}>
        <Animated.Text style={[styles.header, { fontSize: instructionText[instructionTextIndex].fontSize }]}>
          {instructionText[instructionTextIndex].instruction}
        </Animated.Text>
      </View>

      {/*
      <TouchableOpacity onPress={handleTap} activeOpacity={0.9}>
        <View style={styles.timerContainer}>
          <View style={styles.timer}></View>
          <Animated.View style={styles.ripple} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.touchable} onPress={ () => handleTap()}>
            <View style={styles.timer}></View>
          </TouchableOpacity>
       TouchableOpacity for tap detection */}

        <View style={styles.timerContainer}>
          <TouchableOpacity style={styles.touchable} activeOpacity={0.8} onPress={handleTap}>
            <View style={styles.timer}></View>
          </TouchableOpacity>
          <Animated.View style={styles.ripple} />
        </View>
    </View>
  );
};
