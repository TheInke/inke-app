import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const ClickableOption = ({
  iconName,
  text,
  onPress,
  textColor = 'black',
  iconColor = "rgba(20, 20, 20, 1)",
}) => (
  <View style={styles.clickableOptionShadowBox}>
    <TouchableOpacity style={styles.clickableOption} onPress={onPress} activeOpacity={0.7}>
      <Icon name={iconName} size={20} color={iconColor} />
      <Text style={[styles.clickableOptionName, { color: textColor }]}>{text}</Text>
      <View style={styles.rightIconContainer}>
        <Icon name="chevron-right" size={20} color="rgba(20, 20, 20, 1)" />
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  clickableOption: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '90%',
    alignSelf: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 0.2,
    borderRadius: 7,
  },
  clickableOptionShadowBox: {
    shadowColor: 'lightgray',
    shadowOffset: { width: -0.5, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
  },
  clickableOptionName: {
    fontSize: 17,
    marginLeft: 20,
  },
  rightIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
});

export default ClickableOption;
