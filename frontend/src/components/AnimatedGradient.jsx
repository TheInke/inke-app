import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AnimatedGradient = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Create a looping animation
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 4000,  // Adjust the duration for speed control
        useNativeDriver: false,
      })
    ).start();
  }, [animatedValue]);

  // Interpolate the animation value to move the gradient
  const startX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const endX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '0%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ flex: 1 }}>
        <LinearGradient
          colors={['#FF5733', '#33FFCE', '#339FFF']}
          start={{ x: startX, y: 0 }}
          end={{ x: endX, y: 1 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AnimatedGradient;
