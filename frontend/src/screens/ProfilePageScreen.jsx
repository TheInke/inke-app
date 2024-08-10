import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons'; // Import icons

const { width } = Dimensions.get('window');

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock user data
  const mockUserData = {
    name: 'Helena',
    albums: [
      { image: 'https://i.pinimg.com/736x/3d/55/39/3d5539b94d5fcecdd25cc590c2470c75.jpg', title: 'Get Ready', description: 'All my makeup videos' },
      { image: 'https://i.pinimg.com/564x/b1/ba/3b/b1ba3be655ea7ebc4942a3c05def5206.jpg', title: 'Vacation', description: 'Spain and Dubai' },
    ],
    socialCircles: [
      { image: 'https://i.pinimg.com/736x/3d/55/39/3d5539b94d5fcecdd25cc590c2470c75.jpg', name: 'Mentally Well' },
      { image: 'https://i.pinimg.com/736x/81/e7/b1/81e7b19edeaf66eab03eb6e3231440d4.jpg', name: 'Songwriters' },
      { image: 'https://i.pinimg.com/736x/be/81/43/be8143dd0e570792b3e39a7a7f32ee3c.jpg', name: 'FIU' },
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

  if (loading) return <Text style={styles.loader}>Loading...</Text>;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
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

        {/* About Helena Section */}
        <View style={styles.profileSection}>
          <Text style={styles.sectionHeader}>About Helena</Text>
          <Text style={styles.sectionSubHeader}>Helena's Albums</Text>
        </View>

        {/* Albums Section */}
        <View style={styles.albumsSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.albums}>
            {userData.albums.map((album, index) => (
              <View style={styles.album} key={index}>
                <Image source={{ uri: album.image }} style={styles.albumImg} />
                <Text style={styles.albumTitle}>{album.title}</Text>
                <Text style={styles.albumDescriptionTitle}>Title</Text>
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

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNavBar}>
        <TouchableOpacity>
          <Ionicons name="search" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="circle" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="person" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    paddingHorizontal: 20, // Ensure consistent padding for the entire screen
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
    marginTop: 40, // Increased space above "About Helena"
    marginBottom: 5, // Reduced margin to bring it closer to albums
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2, // Further reduce space between "About Helena" and "Helena's Albums"
  },
  sectionSubHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8, // Reduce space between "Helena's Albums" and the albums themselves
  },
  albumsSection: {
    marginBottom: 30,
  },
  albums: {
    paddingVertical: 10,
  },
  album: {
    width: width * 0.5, // Smaller squares
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
    position: 'relative', // Added to position overlay text
  },
  albumImg: {
    width: '100%',
    height: width * 0.5, // Making the image square
    borderRadius: 10,
  },
  albumTitle: {
    position: 'absolute',
    top: 10, // Lowered the title position
    left: 0,
    right: 0,
    textAlign: 'center', // Center text
    fontSize: 24, // Increased font size
    fontWeight: 'bold',
    color: '#fff', // White text color for contrast
    zIndex: 1, // Ensure the title appears above the image
  },
  albumDescriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
    textAlign: 'left', // Align left
    paddingLeft: 10, // Add some padding from the left
  },
  albumDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left', // Align left
    paddingLeft: 10, // Add some padding from the left
  },
  socialCirclesSection: {
    marginBottom: 30,
  },
  socialCircles: {
    paddingVertical: 10,
  },
  circle: {
    alignItems: 'center',
    marginRight: 10, // Reduced margin between circles to bring them closer
  },
  circleImg: {
    width: 100, // Increased size of circles
    height: 100, // Increased size of circles
    borderRadius: 50,
    marginBottom: 3,
  },
  circleName: {
    fontSize: 12, // Smaller font size to fit under the larger circles
    color: '#333',
    textAlign: 'center',
  },
  feedSection: {
    marginBottom: 30,
  },
  feedSubtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Adjusted to bring icons closer together
    paddingVertical: 25, // Increased height of the bottom navigation bar
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
});
