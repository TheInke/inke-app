import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Modal, Pressable, TextInput, Animated, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import MasonryList from '@react-native-seoul/masonry-list';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';

// Mock data for posts
const mockPosts = [
    {
        id: 1,
        user: {
            username: 'Ashley',
            profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWqIODNMh2fpOtfun6Spu3rkMKa-nEpAlVA&s', // Empty profilePic to simulate missing profile picture
        },
        imageUrl: 'data:image/jpeg;base64,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',
        isLiked: false,
        comments: [
            { user: 'Tom', text: 'Amazing view!' },
            { user: 'Lia', text: 'Enjoy your vacay!' },
        ],
        description: 'Beautiful sunset at the beach'
    },
    {
        id: 2,
        user: {
            username: 'Sarah',
            profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOmlcrEfYZdBUHVwXggzrQiS9gyYH_FTOogg&s', // Empty profilePic to simulate missing profile picture
        },
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR2YjnLyQugucueVk0h3kv51R__HMpG93MgQ&s',
        isLiked: false,
        comments: [
            { user: 'John', text: 'Nice!', fontWeight: "bold" },
            { user: 'Mike', text: 'Cool!' },
            { user: 'Adam', text: 'The GOAT' },
        ],
        description: 'Beautiful sunset at the beach'
    },
    {
        id: 4,
        user: {
            username: 'Adam',
            profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJZ38cGhD4JYl3jwI1QTGz6W04QNcgGto3Ug&s', // Empty profilePic to simulate missing profile picture
        },
        imageUrl: 'data:image/jpeg;base64,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',
        isLiked: false,
        comments: [
            { user: 'John', text: 'Congratulations!', fontWeight: "bold" },
            { user: 'Mike', text: 'Lets goo!' },
        ],
    },
    {
        id: 5,
        user: {
            username: 'Jessi',
            profilePic: 'data:image/jpeg;base64,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', // Empty profilePic to simulate missing profile picture
        },
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzB7MxL7isjDRwSo09M-3Yny_e188qVp9s0w&s',
        isLiked: false,
        comments: [
            { user: 'John', text: 'Beautiful', fontWeight: "bold" },
            { user: 'Mike', text: 'So pretty' },
            { user: 'Adam', text: 'Love thiss' },
        ],
    },
];

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [activeTab, setActiveTab] = useState('ForYou'); // Default active tab
    const [showFullScreenImage, setShowFullScreenImage] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const lastPressRef = useRef(0);

    useEffect(() => {
        // Simulate fetching posts
        setPosts(mockPosts); // Replace with actual data fetching
    }, []);

    const handleDoubleTap = (postId) => {
        const updatedPosts = posts.map((post) =>
            post.id === postId ? { ...post, isLiked: !post.isLiked } : post
        );
        setPosts(updatedPosts);
    };

    const openFullScreenImage = (imageUrl) => {
        setSelectedImageUrl(imageUrl);
        setShowFullScreenImage(true);
    };

    const closeFullScreenImage = () => {
        setShowFullScreenImage(false);
        setSelectedImageUrl('');
    };

    const onGestureEvent = (event) => {
        if (event.nativeEvent.translationY > 100) {
            // Swipe down threshold
            closeFullScreenImage();
        }
    };

    const handlePress = (postId) => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (now - lastPressRef.current < DOUBLE_PRESS_DELAY) {
            handleDoubleTap(postId);
            Animated.sequence([
                Animated.timing(scaleAnim, { toValue: 1.2, duration: 100, useNativeDriver: true }),
                Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
            ]).start();
        } else {
            lastPressRef.current = now;
            handleDoubleTap(postId);
        }
    };

    const renderPost = ({ item }) => (
        <View style={styles.postContainer}>
            <Pressable onPress={() => openFullScreenImage(item.imageUrl)}>
                <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
            </Pressable>
            <View style={styles.overlayContainer}>
                <Image
                    source={{ uri: item.user.profilePic || 'https://via.placeholder.com/150' }}
                    style={styles.overlayProfilePic}
                />
                <Text style={styles.overlayUsername}>{item.user.username}</Text>
            </View>
            <View style={styles.actionsContainer}>
                <TouchableWithoutFeedback onPress={() => handlePress(item.id)}>
                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <FontAwesome
                            name={item.isLiked ? 'heart' : 'heart-o'}
                            size={24}
                            color={item.isLiked ? 'red' : 'white'}
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <Pressable onPress={() => openCommentsModal(item)}>
                    <Text style={styles.commentsLink}>Comments</Text>
                </Pressable>
            </View>
        </View>
    );

    const openCommentsModal = (post) => {
        setSelectedPost(post);
        setShowCommentsModal(true);
    };

    const closeCommentsModal = () => {
        setShowCommentsModal(false);
        setSelectedPost(null);
    };

    const handleTabPress = (tab) => {
        setActiveTab(tab);
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabsContainer}>
                <Pressable
                    style={[styles.tab, activeTab === 'Following' && styles.activeTab]}
                    onPress={() => handleTabPress('Following')}
                >
                    <Text style={styles.tabText}>Following</Text>
                </Pressable>
                <Pressable
                    style={[styles.tab, activeTab === 'ForYou' && styles.activeTab]}
                    onPress={() => handleTabPress('ForYou')}
                >
                    <Text style={styles.tabText}>For You</Text>
                </Pressable>
                <Pressable
                    style={[styles.tab, activeTab === 'Favorites' && styles.activeTab]}
                    onPress={() => handleTabPress('Favorites')}
                >
                    <Text style={styles.tabText}>Favorites</Text>
                </Pressable>
            </View>
            {activeTab === 'ForYou' && (
                <BlurView intensity={100} style={StyleSheet.absoluteFill}>
                    <View style={[styles.overlay, { paddingTop: 50 }]}>
                        <MasonryList
                            data={posts}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderPost}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                        />
                        <Modal
                            animationType="slide"
                            visible={showCommentsModal}
                            onRequestClose={closeCommentsModal}
                            transparent={true}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalHeaderText}>Comments</Text>
                                    <View style={styles.divider} />
                                </View>
                                <ScrollView style={styles.commentsScrollView}>
                                    {selectedPost &&
                                        selectedPost.comments.map((comment, index) => (
                                            <View key={index} style={styles.commentContainer}>
                                                <Text style={styles.commentText}>
                                                    <Text style={styles.commentUsername}>
                                                        {comment.user}
                                                    </Text>
                                                    : {comment.text}
                                                </Text>
                                            </View>
                                        ))}
                                </ScrollView>
                                <View style={styles.commentInputContainer}>
                                    <TextInput
                                        style={styles.commentInput}
                                        placeholder="Add a comment..."
                                        placeholderTextColor="#888888"
                                        value={commentText}
                                        onChangeText={setCommentText}
                                    />
                                    <Pressable
                                        style={styles.addCommentButton}
                                        onPress={() => {
                                            console.log('Add comment functionality here');
                                        }}
                                    >
                                        <Text style={styles.addCommentButtonText}>Post</Text>
                                    </Pressable>
                                </View>
                                <Pressable onPress={closeCommentsModal} style={styles.closeModalButton}>
                                    <Text style={styles.closeModalButtonText}>Close</Text>
                                </Pressable>
                            </View>
                        </Modal>
                        <Modal
                            animationType="fade"
                            visible={showFullScreenImage}
                            onRequestClose={closeFullScreenImage}
                            transparent={true}
                        >
                            <PanGestureHandler
                                onGestureEvent={onGestureEvent}
                                onHandlerStateChange={({ nativeEvent }) => {
                                    if (nativeEvent.state === State.END) {
                                        if (nativeEvent.translationY > 100) {
                                            closeFullScreenImage();
                                        }
                                    }
                                }}
                            >
                                <View style={styles.fullScreenImageContainer}>
                                    <Pressable style={styles.fullScreenImageCloseButton} onPress={closeFullScreenImage}>
                                        <Text style={styles.fullScreenImageCloseButtonText}>×</Text>
                                    </Pressable>
                                    <Image source={{ uri: selectedImageUrl }} style={styles.fullScreenImage} />
                                </View>
                            </PanGestureHandler>
                        </Modal>
                    </View>
                </BlurView>
            )}
            {activeTab === 'Following' && (
                <View style={styles.tabContent}>
                    <Text>Following Content</Text>
                </View>
            )}
            {activeTab === 'Favorites' && (
                <View style={styles.tabContent}>
                    <Text>Favorites Content</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#000000',
        paddingTop: 2,
        paddingBottom: 1,
        zIndex: 10,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    tabText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#FFFFFF',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 8,
    },
    postContainer: {
        marginBottom: 25,
        borderRadius: 5,
        overflow: 'hidden',
        marginLeft: 10,
        marginRight: 5,
    },
    overlayContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        borderRadius: 5,
    },
    overlayProfilePic: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 8,
    },
    overlayUsername: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    commentsLink: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '50%',
        backgroundColor: '#1c1c1c',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalHeader: {
        alignItems: 'center',
        marginBottom: 10,
    },
    modalHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    divider: {
        height: 1,
        backgroundColor: '#333333',
        width: '100%',
        marginVertical: 10,
    },
    commentsScrollView: {
        flex: 1,
    },
    commentContainer: {
        padding: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#1c1c1c',
    },
    commentText: {
        color: '#FFFFFF',
    },
    commentUsername: {
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    commentInput: {
        flex: 1,
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#333333',
        color: '#FFFFFF',
    },
    addCommentButton: {
        marginLeft: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
    },
    addCommentButtonText: {
        color: '#000000',
        fontWeight: 'bold',
    },
    closeModalButton: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    closeModalButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    fullScreenImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    fullScreenImage: {
        width: '90%',
        height: '90%',
        borderRadius: 10,
    },
    fullScreenImageCloseButton: {
        position: 'absolute',
        top: 30,
        right: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 20,
    },
    fullScreenImageCloseButtonText: {
        fontSize: 24,
        color: '#FFFFFF',
    },
    tabContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomePage;