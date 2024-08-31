import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import email from 'react-native-email';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HelpAndSupportScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Array of quotes to be displayed
  const quotes = [
    "You are not alone; we're here to help you.",
    "Every question matters, and so do you.",
    "Reach out—because your voice deserves to be heard.",
    "Your feelings are valid; let us support you.",
    "A step towards us is a step towards healing.",
    "We are just a message away from helping you feel better.",
    "Whatever you're going through, we're here to listen.",
    "Your journey is important. Let us walk beside you.",
    "Every concern is important to us—share yours.",
    "Need a hand? We're here to hold it.",
    "The courage to ask for help is a sign of strength.",
    "Let’s find a way forward, together.",
    "Support is just a message away.",
    "No question is too small; no worry is too big."
  ];

  // Effect to change the quote every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // Change every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to handle sending email
  const handleSendEmail = () => {
    const to = 'support@appdomain.com'; // Replace with your app's support email
    if (query.trim() === '') {
      Alert.alert('Error', 'Please enter your query or complaint.');
      return;
    }

    const userEmail = 'user.email@example.com'; // Replace with actual logic to get the logged-in user's email

    email(to, {
      subject: 'User Query or Complaint',
      body: `From: ${userEmail}\n\n${query}`,
    }).catch((error) => {
      console.error('Error sending email:', error);
      Alert.alert('Error', 'Failed to open the email client. Please try again later.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cursiveText}>{`"${quotes[currentQuoteIndex]}"`}</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe your complaint or query here..."
        multiline
        numberOfLines={6}
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
        <Ionicons name="mail-outline" size={20} color="#ffffff" />
        <Text style={styles.buttonText}> Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  cursiveText: {
    fontSize: 22,
    fontFamily: 'Cochin', // Replace 'Cochin' with a cursive font of your choice
    fontStyle: 'italic',
    fontWeight: 'bold', // Make the text bold
    textAlign: 'center',
    color: '#333333',
    marginBottom: 60, // Increased margin for spacing
  },
  input: {
    width: '100%',
    height: 250,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    position: 'absolute',
    bottom: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default HelpAndSupportScreen;
