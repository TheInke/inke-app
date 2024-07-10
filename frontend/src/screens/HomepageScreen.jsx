import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, TextInput, StyleSheet, Dimensions } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';


// Mock data for posts
const mockPosts = [
    {
        id: 1,
        user: {
            username: 'Ashley',
            profilePic: 'data:image/jpeg;base64,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', // Replace with actual URL
        },
        imageUrl: 'https://www.travelandleisure.com/thmb/mEEStoglkK-sy7Gv1YUzi4Gft5k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-hilton-aruba-FAMBCHRESCARIB0423-7bc188d10b5a4458b76945bd9fcee397.jpg',
        likes: [{ userId: 1 }, { userId: 2 }],
        comments: [
            { user: 'Tom', text: 'Amazing view!' },
            { user: 'Lia', text: 'Enjoy your vacay!' },
        ],
    },
    {
        id: 2,
        user: {
            username: 'Micheal',
            profilePic: 'data:image/jpeg;base64,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', // Replace with actual URL
        },
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThCG8h9BBMXFacVntF71wMy7aeiSEJPeS35w&s',
        likes: [{ userId: 1 }],
        comments: [
            { user: 'John', text: 'Congratulations!', fontWeight: "bold" },
            { user: 'Mike', text: 'Lets goo!' },
            { user: 'Adam', text: 'The GOAT' },
        ],
    },
];

const ACCESS_TOKEN = 'accessToken';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        // Simulate fetching access token
        const fetchData = async () => {
            try {
                const token = 'mockAccessToken'; // Replace with access token
                setAccessToken(token);

                // Simulate fetching posts from API
                setPosts(mockPosts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Like button function
    const handleLike = (postId) => {
        console.log(`Liked post with ID ${postId}`);
        // Simulate update of likes count
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                // Simulate adding a like
                return {
                    ...post,
                    likes: [...post.likes, { userId: 3 }], // Assuming user ID 3 liked the post
                };
            }
            return post;
        });
        setPosts(updatedPosts);
    };

    // Comment function
    const handleAddComment = (postId, commentText) => {
        console.log(`Added comment "${commentText}" to post with ID ${postId}`);
        // Simulate adding comment to the post
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: [
                        ...post.comments,
                        { user: 'CurrentUser', text: commentText },
                    ],
                };
            }
            return post;
        });
        setPosts(updatedPosts);
    };

    // Post function
    const renderPost = ({ item }) => (
        <View style={styles.postContainer}>
            {/* User Info */}
            <View style={styles.userInfoContainer}>
                <Image source={{ uri: item.user.profilePic }} style={styles.profilePic} />
                <Text style={styles.username}>{item.user.username}</Text>
            </View>
            <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
            <View style={styles.likeContainer}>
                <Text style={styles.likesText}>{item.likes.length}</Text>
            </View>
            
            {/* Comment Section */}
            <View>
                {item.comments.map((comment, index) => (
                    <View key={index} style={styles.commentContainer}>
                        <Text>{comment.user}: {comment.text}</Text>
                    </View>
                ))}
                <AddComment postId={item.id} onAddComment={handleAddComment} />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <MasonryList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderPost}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

// Adding comment function
const AddComment = ({ postId, onAddComment }) => {
    const [commentText, setCommentText] = useState('');

    const handleSubmit = () => {
        if (commentText.trim() === '') return;
        onAddComment(postId, commentText);
        setCommentText('');
    };

    return (
        <View style={styles.commentInputContainer}>
            <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                value={commentText}
                onChangeText={setCommentText}
                onSubmitEditing={handleSubmit}
            />
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;

// Styling of homepage
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0EAD6', // Tan background color
        padding: 8,
    },
    postContainer: {
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
        padding: 10,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20, // Rounded corners for profile picture
        marginRight: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 10, // Rounded corners for post image
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    likesText: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    commentContainer: {
        padding: 3,
        marginBottom: 2,
        borderRadius: 3,
    },
    commentInputContainer: {
        paddingTop: 10,
    },
    commentInput: {
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        username: {fontWeight: 'bold'},
    },
});

export default HomePage;
