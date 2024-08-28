import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditNameScreen = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const handleSave = () => {
    // Save logic here (e.g., make API call or update state)
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your new name:</Text>
      <TextInput
        style={styles.input}
        placeholder="New name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Save" onPress={handleSave} disabled={!name.trim()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
  },
});

export default EditNameScreen;
