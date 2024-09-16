import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const messages = [
  { id: '1', name: 'Eduardo', message: 'Tell me a fun fact.', time: '2 minutes ago', unread: 2 },
  { id: '2', name: 'Greg', message: 'Can you recommend a good book?', time: '10 minutes ago', unread: 1 },
  { id: '3', name: 'Angel', message: "What's the weather like today?", time: '35 minutes ago' },
  { id: '4', name: 'Debra', message: "I don't eat, so I don't have a favorite food.", time: '2 hours ago' },
  { id: '5', name: 'Darrell', message: 'Why did the scarecrow win an award? Because...', time: '4 hours ago' },
  { id: '6', name: 'Arlene', message: 'Hi there!', time: '7 hours ago' },
  { id: '7', name: 'Darlene', message: 'Hello!', time: '12 hours ago' },
  { id: '8', name: 'Cody', message: 'Did you know...', time: '22 hours ago' },
  { id: '9', name: 'Leslie', message: 'The capital of France is Paris.', time: '22 hours ago' },
  { id: '10', name: 'Max', message: 'What genre are you interested in?', time: '3 days ago' },
];

const DirectMessageScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.messageContainer}
      onPress={() => navigation.navigate('Chat', { name: item.name })} // Pass the 'name' parameter correctly
    >
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with actual user avatar URLs
        />
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.timeAndBadge}>
            <Text style={styles.time}>{item.time}</Text>
            {item.unread && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </View>
            )}
          </View>
        </View>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#888888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search people..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </View>

      <FlatList
        data={filteredMessages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={styles.messageList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageContent: {
    flex: 1,
    justifyContent: 'center',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeAndBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    color: '#888888',
    marginRight: 5,
  },
  messageText: {
    fontSize: 14,
    color: '#333333',
    marginTop: 4,
  },
  unreadBadge: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default DirectMessageScreen;
