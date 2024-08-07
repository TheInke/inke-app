/*
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { login } from '../services/api'; // Import login function from api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN } from '../constants';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await login(username, password);
            console.log('LOGIN SUCCESS | ln16');    //testing login

            const accessToken = response.data.access;
            // console.log("THIS IS ACCESS TOKEN", accessToken);  //printing accessToken from the data

            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
            // const storedToken = await AsyncStorage.getItem(ACCESS_TOKEN);
            // console.log('TOKEN STORED IN ASYNC STORAGE:', storedToken);

            // Navigate to the main screen or perform other actions
            navigation.navigate('Main');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;
*/

/*
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchSearchData } from '../services/api';

const SearchScreen = () => {
    const [data, setData] = useState({
        popular_searches: [],
        articles: [],
        videos: [],
        podcasts: [],
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const searchData = await fetchSearchData();
                setData(searchData);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        getData();
    }, []);

    return (
        <ScrollView style={styles.searchPage}>
            <View style={styles.searchBar}>
                <TextInput 
                    style={styles.searchInput} 
                    placeholder="Search keywords" 
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Popular searches</Text>
                <View style={styles.tags}>
                    {data.popular_searches.map((tag, index) => (
                        <TouchableOpacity key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Articles</Text>
                {data.articles.map((article, index) => (
                    <View key={index} style={styles.article}>
                        <Image source={{ uri: article.image }} style={styles.articleImage} />
                        <Text>{article.title}</Text>
                    </View>
                ))}
                <TouchableOpacity style={styles.viewMore}>
                    <Text style={styles.viewMoreText}>view more ></Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Videos</Text>
                <View style={styles.videoList}>
                    {data.videos.map((video, index) => (
                        <View key={index} style={styles.video}>
                            <Image source={{ uri: video.thumbnail }} style={styles.videoImage} />
                            <Text>{video.title}</Text>
                        </View>
                    ))}
                </View>
                <TouchableOpacity style={styles.viewMore}>
                    <Text style={styles.viewMoreText}>view more ></Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Podcasts</Text>
                {data.podcasts.map((podcast, index) => (
                    <View key={index} style={styles.podcast}>
                        <Text>{podcast.title}</Text>
                    </View>
                ))}
                <TouchableOpacity style={styles.viewMore}>
                    <Text style={styles.viewMoreText}>view more ></Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    searchPage: {
        padding: 20,
    },
    searchBar: {
        marginBottom: 20,
    },
    searchInput: {
        width: '100%',
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    tag: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
    },
    tagText: {
        color: '#fff',
    },
    article: {
        marginBottom: 10,
    },
    articleImage: {
        width: '100%',
        height: 150,
        borderRadius: 5,
    },
    videoList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    video: {
        flex: 1,
        marginBottom: 10,
    },
    videoImage: {
        width: '100%',
        height: 150,
        borderRadius: 5,
    },
    viewMore: {
        backgroundColor: '#6c63ff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    viewMoreText: {
        color: '#fff',
        textAlign: 'center',
    },
    podcast: {
        marginBottom: 10,
    },
});

export default SearchScreen;
*/



/*
// SearchScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchSearchData } from '../services/api';

const SearchScreen = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        popular_searches: [],
        articles: [],
        videos: [],
        podcasts: [],
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const searchData = await fetchSearchData();
                setData(searchData);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch data', error);
                setLoading(false);
            }
        };

        getData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.searchPage}>
            <View style={styles.searchBar}>
                <TextInput 
                    style={styles.searchInput} 
                    placeholder="Search keywords" 
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Popular searches</Text>
                <View style={styles.tags}>
                    {data.popular_searches.map((tag, index) => (
                        <TouchableOpacity key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Articles</Text>
                {data.articles.map((article, index) => (
                    <View key={index} style={styles.article}>
                        <Image source={{ uri: article.image }} style={styles.articleImage} />
                        <Text>{article.title}</Text>
                    </View>
                ))}
                <TouchableOpacity style={styles.viewMore}>
                    <Text style={styles.viewMoreText}>view more ></Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Videos</Text>
                <View style={styles.videoList}>
                    {data.videos.map((video, index) => (
                        <View key={index} style={styles.video}>
                            <Image source={{ uri: video.thumbnail }} style={styles.videoImage} />
                            <Text>{video.title}</Text>
                        </View>
                    ))}
                </View>
                <TouchableOpacity style={styles.viewMore}>
                    <Text style={styles.viewMoreText}>view more ></Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Podcasts</Text>
                {data.podcasts.map((podcast, index) => (
                    <View key={index} style={styles.podcast}>
                        <Text>{podcast.title}</Text>
                    </View>
                ))}
                <TouchableOpacity style={styles.viewMore}>
                    <Text style={styles.viewMoreText}>view more ></Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    searchPage: {
        padding: 20,
    },
    searchBar: {
        marginBottom: 20,
    },
    searchInput: {
        width: '100%',
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    tag: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
    },
    tagText: {
        color: '#fff',
    },
    article: {
        marginBottom: 10,
    },
    articleImage: {
        width: '100%',
        height: 150,
        borderRadius: 5,
    },
    videoList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    video: {
        flex: 1,
        marginBottom: 10,
    },
    videoImage: {
        width: '100%',
        height: 150,
        borderRadius: 5,
    },
    viewMore: {
        backgroundColor: '#6c63ff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    viewMoreText: {
        color: '#fff',
        textAlign: 'center',
    },
    podcast: {
        marginBottom: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SearchScreen;
*/

/*
// SearchScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchSearchData } from '../services/api';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchScreen = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        popular_searches: [],
        articles: [],
        videos: [],
        podcasts: [],
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const searchData = await fetchSearchData();
                setData(searchData);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch data', error);
                setLoading(false);
            }
        };

        getData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.searchPage}>
            <View style={styles.searchBar}>
                <Icon name="search" size={20} color="#ccc" style={styles.searchIcon} />
                <TextInput 
                    style={styles.searchInput} 
                    placeholder="Search keywords" 
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Popular searches</Text>
                <View style={styles.tags}>
                    {data.popular_searches.map((tag, index) => (
                        <TouchableOpacity key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Articles</Text>
                {data.articles.map((article, index) => (
                    <View key={index} style={styles.article}>
                        <Image source={{ uri: article.image }} style={styles.articleImage} />
                        <Text style={styles.articleTitle}>{article.title}</Text>
                    </View>
                ))}
                <TouchableOpacity style={styles.viewMore}>
                    <Text style={styles.viewMoreText}>view more ></Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Videos</Text>
                <View style={styles.videoList}>
                    {data.videos.map((video, index) => (
                        <View key={index} style={styles.video}>
                            <Image source={{ uri: video.thumbnail }} style={styles.videoImage} />
                            <Text style={styles.videoTitle}>{video.title}</Text>
                        </View>
                    ))}
                </View>
                <TouchableOpacity style={styles.viewMore}>
                    <Text style={styles.viewMoreText}>view more ></Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Podcasts</Text>
                {data.podcasts.map((podcast, index) => (
                    <View key={index} style={styles.podcast}>
                        <Image source={{ uri: podcast.thumbnail }} style={styles.podcastImage} />
                        <Text style={styles.podcastTitle}>{podcast.title}</Text>
                    </View>
                ))}
                <TouchableOpacity style={styles.viewMore}>
                    <Text style={styles.viewMoreText}>view more ></Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    searchPage: {
        padding: 20,
        backgroundColor: '#fff',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    tag: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
    },
    tagText: {
        color: '#fff',
    },
    article: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    articleImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    articleTitle: {
        flex: 1,
    },
    videoList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    video: {
        width: '48%',
        marginBottom: 10,
    },
    videoImage: {
        width: '100%',
        height: 100,
        borderRadius: 5,
    },
    videoTitle: {
        textAlign: 'center',
        marginTop: 5,
    },
    viewMore: {
        alignSelf: 'flex-start',
        backgroundColor: '#6c63ff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    viewMoreText: {
        color: '#fff',
        textAlign: 'center',
    },
    podcast: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    podcastImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    podcastTitle: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SearchScreen;
*/


/*
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';

const SearchScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput style={styles.searchInput} placeholder="Search keywords" />
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
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.articleImage} />
          <View style={styles.articleContent}>
            <Text style={styles.articleTitle}>“The link between chronic diseases and mental health”</Text>
            <TouchableOpacity>
              <Text style={styles.viewMore}>view more > </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Videos</Text>
        <View style={styles.videoRow}>
          <View style={styles.videoItem}>
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.videoImage} />
            <Text style={styles.videoTitle}>Mental Health Education</Text>
          </View>
          <View style={styles.videoItem}>
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.videoImage} />
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
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.podcastImage} />
          <Text style={styles.podcastTitle}>Feel Better, Live More with Dr. Chatterjee</Text>
        </View>
        <View style={styles.podcastItem}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.podcastImage} />
          <Text style={styles.podcastTitle}>The Mental Illness Happy Hour with Paul Gilmartin</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.viewMore}>view more ></Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
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
    fontSize: 16,
  },
});

export default SearchScreen;
*/




/*
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.searchBar}>
          <TextInput style={styles.searchInput} placeholder="Search keywords" />
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
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.articleImage} />
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
              <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.videoImage} />
              <Text style={styles.videoTitle}>Mental Health Education</Text>
            </View>
            <View style={styles.videoItem}>
              <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.videoImage} />
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
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.podcastImage} />
            <Text style={styles.podcastTitle}>Feel Better, Live More with Dr. Chatterjee</Text>
          </View>
          <View style={styles.podcastItem}>
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.podcastImage} />
            <Text style={styles.podcastTitle}>The Mental Illness Happy Hour with Paul Gilmartin</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewMore}>view more ></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Entypo name="grid" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="add-circle" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="groups" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
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
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
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
    fontSize: 16,
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
*/





import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
          <TextInput style={styles.searchInput} placeholder="Search keywords" />
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
            <Image  source={{ uri: 'https://www.sciencedirect.com/science/article/abs/pii/S2212657023000491#:~:text=The%20four%20types%20of%20chronic,within%20the%20past%2030%20days./150' }} style={styles.articleImage} />
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
              <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.videoImage} />
              <Text style={styles.videoTitle}>Mental Health Education</Text>
            </View>
            <View style={styles.videoItem}>
              <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.videoImage} />
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
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.podcastImage} />
            <Text style={styles.podcastTitle}>Feel Better, Live More with Dr. Chatterjee</Text>
          </View>
          <View style={styles.podcastItem}>
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.podcastImage} />
            <Text style={styles.podcastTitle}>The Mental Illness Happy Hour with Paul Gilmartin</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewMore}>view more ></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Entypo name="grid" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="add-circle" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="groups" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
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
    fontSize: 16,
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
