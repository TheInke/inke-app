import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';

const HomepageScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = 'currentUser'; // This can be dynamic based on your authentication logic

        const mockPosts = [
            {
                id: 1,
                image: 'https://via.placeholder.com/150',
                description: 'Mock Post 1',
                comments: [
                    { id: 101, text: 'Comment 1' },
                    { id: 102, text: 'Comment 2' },
                ]
            },
            {
                id: 2,
                image: 'https://via.placeholder.com/150',
                description: 'Mock Post 2',
                comments: [
                    { id: 201, text: 'Comment 1' },
                    { id: 202, text: 'Comment 2' },
                ]
            },
            // Add more mock posts as needed
        ];

        // Simulate async data fetching
        const loadPosts = async () => {
            try {
                // Simulate delay to mimic network request
                await new Promise(resolve => setTimeout(resolve, 1000));
                setPosts(mockPosts);
                setLoading(false);
            } catch (error) {
                console.error('Error loading posts:', error);
                setError(error);
                setLoading(false);
            }
        };

        if (posts.length === 0) {
            loadPosts();
        }
    }, [posts]);

    const renderPost = ({ item }) => (
        <View style={styles.postContainer}>
            <Image source={{ uri: item.image }} style={styles.postImage} />
            <Text style={styles.postDescription}>{item.description}</Text>
            {item.comments.map(comment => (
                <Text key={comment.id} style={styles.commentText}>- {comment.text}</Text>
            ))}
        </View>
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error loading posts: {error.message}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={item => item.id.toString()} // Ensure key is string type
                numColumns={2}
                contentContainerStyle={styles.grid}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F0EDEE', // Tan background color
    },
    grid: {
        alignItems: 'center',
    },
    postContainer: {
        flex: 1,
        margin: 5,
        backgroundColor: '#B76E79', // Rose gold background color
        borderRadius: 10,
        overflow: 'hidden',
    },
    postImage: {
        width: '100%',
        height: 150,
    },
    postDescription: {
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#A2A2A1', // Chrome text color
    },
    commentText: {
        padding: 10,
        paddingTop: 0,
        fontSize: 14,
        color: '#A2A2A1', // Chrome text color
    },
});

export default HomepageScreen;
