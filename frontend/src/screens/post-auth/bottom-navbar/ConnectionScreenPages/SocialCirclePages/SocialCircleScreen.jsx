import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

// Sample Data for Dummy Messages
const messages = [
  {
    id: '1',
    user: 'Lily',
    time: '08/21/2024 1:11 PM',
    text: 'Oh wow!! :) I was reading about this topic in my other groups and there were surprisingly a lot of great suggestions about achieving goals and overcoming your fears.',
    avatar: 'https://example.com/lily-avatar.png',
    type: 'text',
  },
  {
    id: '2',
    user: 'John',
    time: '08/21/2024 1:14 PM',
    text: 'Voice Note',
    avatar: 'https://example.com/john-avatar.png',
    type: 'voice',
  },
  {
    id: '3',
    user: 'Oliver',
    time: '08/21/2024 1:20 PM',
    text: '',
    avatar: 'https://example.com/oliver-avatar.png',
    type: 'image',
  },
  {
    id: '4',
    user: 'Alice',
    time: '08/21/2024 1:25 PM',
    text: 'I totally agree with Lily. It’s so important to set realistic goals and work on them step by step.',
    avatar: 'https://example.com/alice-avatar.png',
    type: 'text',
  },
  {
    id: '5',
    user: 'Mike',
    time: '08/21/2024 1:30 PM',
    text: 'Voice Note',
    avatar: 'https://example.com/mike-avatar.png',
    type: 'voice',
  },
  {
    id: '6',
    user: 'Emma',
    time: '08/21/2024 1:35 PM',
    text: '',
    avatar: 'https://example.com/emma-avatar.png',
    type: 'image',
  },
  {
    id: '7',
    user: 'Liam',
    time: '08/21/2024 1:40 PM',
    text: 'Great discussion! What are some strategies you guys use to stay motivated?',
    avatar: 'https://example.com/liam-avatar.png',
    type: 'text',
  },
  {
    id: '8',
    user: 'Sophia',
    time: '08/21/2024 1:45 PM',
    text: 'Voice Note',
    avatar: 'https://example.com/sophia-avatar.png',
    type: 'voice',
  },
  {
    id: '9',
    user: 'Noah',
    time: '08/21/2024 1:50 PM',
    text: '',
    avatar: 'https://example.com/noah-avatar.png',
    type: 'image',
  },
  {
    id: '10',
    user: 'Olivia',
    time: '08/21/2024 1:55 PM',
    text: 'Reading motivational books helps me a lot!',
    avatar: 'https://example.com/olivia-avatar.png',
    type: 'text',
  },
  {
    id: '11',
    user: 'James',
    time: '08/21/2024 2:00 PM',
    text: 'Voice Note',
    avatar: 'https://example.com/james-avatar.png',
    type: 'voice',
  },
  {
    id: '12',
    user: 'Amelia',
    time: '08/21/2024 2:05 PM',
    text: '',
    avatar: 'https://example.com/amelia-avatar.png',
    type: 'image',
  },
];

const SocialCircleScreen = () => {
  const [message, setMessage] = useState('');

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      {/* User Profile Image */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar} />
      </View>
      {/* Message Content */}
      <View style={styles.messageContent}>
        <Text style={styles.user}>{item.user}</Text>
        <Text style={styles.time}>{item.time}</Text>
        {item.type === 'text' && item.text !== '' && <Text style={styles.text}>{item.text}</Text>}
        {item.type === 'voice' && (
          <TouchableOpacity style={styles.voiceNote}>
            <FontAwesome name="microphone" size={24} color="white" />
            <Text style={styles.voiceText}>Voice Note</Text>
          </TouchableOpacity>
        )}
        {item.type === 'image' && (
          <View style={styles.imageContainer}>
            <View style={styles.imagePlaceholder} />
          </View>
        )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={90} // Adjust this value to better fit your design
    >
      {/* Header Section */}
      <View style={styles.headerContainer}>
        {/* Larger Social Circle Image */}
        <View style={styles.largeGreyCircle} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.header}>Goals</Text>
          <Text style={styles.subheader}>
            Learning how to set goals and achieve them together. We hold each other accountable and support each other’s journey.
          </Text>
          <Text style={styles.moderator}>
            <Text style={{ color: 'black' }}>Moderator: </Text>
            <Text style={{ color: '#1E90FF' }}>Oliver</Text>
          </Text>
          <Text style={styles.members}>1.6k members</Text>
        </View>
      </View>

      {/* Chat Messages */}
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Input Box */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.emojiButton}>
          <FontAwesome name="smile-o" size={24} color="gray" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Write something..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.attachmentButton}>
          <MaterialIcons name="attach-file" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.microphoneButton}>
          <Ionicons name="mic-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  largeGreyCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    marginRight: 15,
  },
  headerTextContainer: {
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subheader: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  moderator: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  members: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  chatContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingHorizontal: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  messageContent: {
    flex: 1,
  },
  user: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
  voiceNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: 120,
    marginBottom: 5,
  },
  voiceText: {
    color: 'white',
    marginLeft: 10,
  },
  imageContainer: {
    marginTop: 5,
  },
  imagePlaceholder: {
    width: 150,
    height: 100,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 40, // Adjusted padding to accommodate the emoji button inside
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    marginRight: 10,
  },
  emojiButton: {
    position: 'absolute', // Positioned inside the input field
    left: 20,
  },
  attachmentButton: {
    marginRight: 10,
  },
  microphoneButton: {
    marginRight: 10,
  },
  sendButton: {
    marginLeft: 10,
  },
});

export default SocialCircleScreen;
