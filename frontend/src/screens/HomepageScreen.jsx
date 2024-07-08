import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { fetchUserData } from '../services/api'; // Import fetchUserData function from api.js
import Icon from 'react-native-vector-icons/FontAwesome';

const HomepageScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const userId = 'currentUser';

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const userData = await fetchUserData(userId);
                const userPosts = userData.posts;
                setPosts(userPosts);
            } catch (error) {
                console.error('Error loading posts:', error);
            }
        };

        loadPosts();
    }, []);

    const renderPost = ({ item }) => (
        <View style={styles.postContainer}>
            <Image source={{ uri: item.image }} style={styles.postImage } />
            <Text style={styles.postDescription}>{item.description}</Text>
            {item.comments.map(comment => (
                <Text key={comment.id} style={styles.commentText}>- {comment.text}</Text>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={item => item.id}
                numColumns={2}
                contentCVontainerStyle={styles.grid}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    grid: {
        alignItems: 'center',
    },
    postContainer: {
        flex: 1,
        margin: 5,
        backgroundColor: '#f8f8f8',
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
    },
    commentText: {
        padding: 10,
        paddingTop: 0,
        fontSize: 14,
        color: '#555',
    },
});

export default HomepageScreen;