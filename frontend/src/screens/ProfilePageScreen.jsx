import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock user data
  const mockUserData = {
    name: 'Helena',
    bio: 'This is a short bio about Helena.',
    albums: [
      { image: 'https://via.placeholder.com/150', title: 'Get Ready', description: 'All my makeup videos' },
      { image: 'https://via.placeholder.com/150', title: 'Vacation', description: 'Spain and Dubai' },
    ],
    socialCircles: [
      { image: 'https://via.placeholder.com/80', name: 'Mentally Well' },
      { image: 'https://via.placeholder.com/80', name: 'Songwriters' },
      { image: 'https://via.placeholder.com/80', name: 'FIU' },
    ],
  };

  // Simulate data fetching
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUserData(mockUserData);
      setLoading(false);
    }, 1000); // Simulate a 1-second loading time
  }, []);

  // Handle form input changes
  const handleInputChange = (key, value) => {
    setUserData({
      ...userData,
      [key]: value,
    });
  };

  if (loading) return <Text style={styles.loader}>Loading...</Text>;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <ScrollView style={styles.container}>
      {/* Tabs Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabButtonText}>Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabButtonText}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabButtonText}>Meditation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabButtonText}>Affirmations</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Text style={styles.sectionHeader}>About {userData.name}</Text>
        {editMode ? (
          <TextInput
            style={styles.input}
            value={userData.bio}
            onChangeText={(value) => handleInputChange('bio', value)}
            multiline
          />
        ) : (
          <Text style={styles.bioText}>{userData.bio}</Text>
        )}
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => setEditMode(!editMode)} style={styles.editButton}>
            <MaterialIcons name={editMode ? 'cancel' : 'edit'} size={24} color="white" />
            <Text style={styles.buttonText}>{editMode ? 'Cancel' : 'Edit'}</Text>
          </TouchableOpacity>
          {editMode && (
            <TouchableOpacity style={styles.saveButton}>
              <MaterialIcons name="save" size={24} color="white" />
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Albums Section */}
      <View style={styles.albumsSection}>
        <Text style={styles.sectionHeader}>{userData.name}'s Albums</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.albums}>
          {userData.albums.map((album, index) => (
            <View style={styles.album} key={index}>
              <Image source={{ uri: album.image }} style={styles.albumImg} />
              <Text style={styles.albumTitle}>{album.title}</Text>
              <Text style={styles.albumDescription}>{album.description}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Social Circles Section */}
      <View style={styles.socialCirclesSection}>
        <Text style={styles.sectionHeader}>Social Circles</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.socialCircles}>
          {userData.socialCircles.map((circle, index) => (
            <View style={styles.circle} key={index}>
              <Image source={{ uri: circle.image }} style={styles.circleImg} />
              <Text style={styles.circleName}>{circle.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Feed Section */}
      <View style={styles.feedSection}>
        <Text style={styles.sectionHeader}>{userData.name}'s Feed</Text>
        <Text style={styles.feedSubtitle}>The Entirety of My Collection</Text>
        {/* Add feed items here */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  loader: {
    marginTop: 50,
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  tabs: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 10, // Add spacing between buttons
    alignItems: 'center', // Center the text
  },
  tabButtonText: {
    fontSize: 14,
    color: '#333',
  },
  profileSection: {
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  input: {
    fontSize: 16,
    color: '#333',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    minHeight: 60,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
  albumsSection: {
    marginBottom: 30,
  },
  albums: {
    paddingVertical: 10,
  },
  album: {
    width: width * 0.6,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  albumImg: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  albumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  albumDescription: {
    fontSize: 14,
    color: '#666',
  },
  socialCirclesSection: {
    marginBottom: 30,
  },
  socialCircles: {
    paddingVertical: 10,
  },
  circle: {
    alignItems: 'center',
    marginRight: 15,
  },
  circleImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  circleName: {
    fontSize: 14,
    color: '#333',
  },
  feedSection: {
    marginBottom: 30,
  },
  feedSubtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
});

