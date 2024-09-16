import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchSearchData } from '../../../../services/api'; // Import the function to fetch data from API
import Icon from 'react-native-vector-icons/Ionicons';

const SearchScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState(''); // State for search query
    const [data, setData] = useState({
        popular_searches: [],
        articles: [],
        videos: [],
        podcasts: [],
    });

    // Fetch data based on the search query
    const handleSearch = async (searchQuery) => {
        setLoading(true);
        try {
            const searchData = await fetchSearchData(searchQuery);
            setData(searchData);
        } catch (error) {
            console.error('Failed to fetch data', error);
        } finally {
            setLoading(false);
        }
    };

    // Trigger search when the query is updated
    useEffect(() => {
        if (query) {
            handleSearch(query);
        }
    }, [query]);

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
                    placeholder="Search Users or Social Circles"
                    value={query}
                    onChangeText={setQuery} // Update query state
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
                    <Text style={styles.viewMoreText}>view more </Text>
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
                    <Text style={styles.viewMoreText}>view more </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Podcasts</Text>
                {data.podcasts.map((podcast, index) => (
                    <View key={index} style={styles.podcast}>
                        <Image source={{ uri: podcast.thumbnail }} style={styles.podcastImage} />
                        <Text>{podcast.title}</Text>
                    </View>
                ))}
                <TouchableOpacity style={styles.viewMore}>
                    <Text style={styles.viewMoreText}>view more </Text>
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
