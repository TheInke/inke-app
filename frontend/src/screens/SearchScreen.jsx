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

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
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
