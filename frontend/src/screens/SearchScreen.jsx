
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import article_Img from '../assets/images/articleImg.png';
import vid_Img1 from '../assets/images/vidImg1.png';
import vid_Img2 from '../assets/images/vidImg2.png';
import pc_Img1 from '../assets/images/pcImg1.png';
import pc_Img2 from '../assets/images/pcImg2.png';


const SearchScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
          <TextInput style={styles.searchInput} placeholder="Search Users" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular searches</Text>
          <View style={styles.popularSearches}>
            {['Psychotherapy', 'Nutrition & Diet', 'Exercises', 'Meditation', 'Anxiety', 'Group Therapy'].map((item, index) => (
              <TouchableOpacity key={index} style={styles.popularSearchButton}>
                <Text style={styles.popularSearchText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Articles</Text>
          <View style={styles.articleItem}>
            <Image source={article_Img} style={styles.articleImage} />
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>“The link between chronic diseases and mental health”</Text>
              <TouchableOpacity>
                <Text style={styles.viewMore}>view more ></Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Videos</Text>
          <View style={styles.videoRow}>
            <View style={styles.videoItem}>
              <Image source={vid_Img1} style={styles.videoImage} />
              <Text style={styles.videoTitle}>Mental Health Education</Text>
            </View>
            <View style={styles.videoItem}>
              <Image source={vid_Img2} style={styles.videoImage} />
              <Text style={styles.videoTitle}>Easy Yoga</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewMore}>view more ></Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Podcasts</Text>
          <View style={styles.podcastItem}>
            <Image source={pc_Img1} style={styles.podcastImage} />
            <Text style={styles.podcastTitle}>Feel Better, Live More with Dr. Chatterjee</Text>
          </View>
          <View style={styles.podcastItem}>
            <Image source={pc_Img2} style={styles.podcastImage} />
            <Text style={styles.podcastTitle}>The Mental Illness Happy Hour with Paul Gilmartin</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewMore}>view more ></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HomeScreen')}>
          <Entypo name="grid" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AnotherScreen')}>
          <Ionicons name="add-circle" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('GroupsScreen')}>
          <MaterialIcons name="groups" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ProfileScreen')}>
          <FontAwesome name="user-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    margin: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  popularSearches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  popularSearchButton: {
    backgroundColor: '#000',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  popularSearchText: {
    color: '#fff',
    fontSize: 14,
  },
  articleItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  articleContent: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewMore: {
    color: '#6c5ce7',
    marginTop: 5,
  },
  videoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  videoItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  videoImage: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  videoTitle: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  podcastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  podcastImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  podcastTitle: {
    fontSize: 13,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchScreen;