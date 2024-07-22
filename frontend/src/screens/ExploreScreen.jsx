import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Modal, Pressable, TextInput, Animated, FlatList, TouchableWithoutFeedback } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Mock data for posts
const mockPosts = [
    {
        id: 1,
        user: {
            username: 'Ashley',
            profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWqIODNMh2fpOtfun6Spu3rkMKa-nEpAlVA&s',
        },
        imageUrl: 'https://i.pinimg.com/474x/71/87/ae/7187ae90ebd10dfe792ea74fef6b41ce.jpg',
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
            profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOmlcrEfYZdBUHVwXggzrQiS9gyYH_FTOogg&s',
        },
        imageUrl: 'https://t4.ftcdn.net/jpg/05/68/63/11/360_F_568631153_ygTLlsjLeVtMrGDSUbqia6VD2GsdbHJx.jpg',
        isLiked: false,
        comments: [
            { user: 'John', text: 'Nice!', fontWeight: "bold" },
            { user: 'Mike', text: 'Cool!' },
            { user: 'Adam', text: 'The GOAT' },
        ],
        description: 'Beautiful sunset at the beach'
    },
    {
        id: 3,
        user: {
            username: 'Adam',
            profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJZ38cGhD4JYl3jwI1QTGz6W04QNcgGto3Ug&s',
        },
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLqJE2BxKJRG-PSI9SR3jG3HmCcVj2Ye80zA&s',
        isLiked: false,
        comments: [
            { user: 'John', text: 'Congratulations!', fontWeight: "bold" },
            { user: 'Mike', text: 'Lets goo!' },
        ],
    },
    {
        id: 4,
        user: {
            username: 'Ashley',
            profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWqIODNMh2fpOtfun6Spu3rkMKa-nEpAlVA&s',
        },
        imageUrl: 'https://i.pinimg.com/474x/71/87/ae/7187ae90ebd10dfe792ea74fef6b41ce.jpg',
        isLiked: false,
        comments: [
            { user: 'Tom', text: 'Amazing view!' },
            { user: 'Lia', text: 'Enjoy your vacay!' },
        ],
        description: 'Beautiful sunset at the beach'
    },
    {
        id: 5,
        user: {
            username: 'Sarah',
            profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOmlcrEfYZdBUHVwXggzrQiS9gyYH_FTOogg&s',
        },
        imageUrl: 'https://t4.ftcdn.net/jpg/05/68/63/11/360_F_568631153_ygTLlsjLeVtMrGDSUbqia6VD2GsdbHJx.jpg',
        isLiked: false,
        comments: [
            { user: 'John', text: 'Nice!', fontWeight: "bold" },
            { user: 'Mike', text: 'Cool!' },
            { user: 'Adam', text: 'The GOAT' },
        ],
        description: 'Beautiful sunset at the beach'
    },
    {
        id: 6,
        user: {
            username: 'Adam',
            profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJZ38cGhD4JYl3jwI1QTGz6W04QNcgGto3Ug&s',
        },
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLqJE2BxKJRG-PSI9SR3jG3HmCcVj2Ye80zA&s',
        isLiked: false,
        comments: [
            { user: 'John', text: 'Congratulations!', fontWeight: "bold" },
            { user: 'Mike', text: 'Lets goo!' },
        ],
    },
    {
        id: 7,
        user: {
            username: 'Ashley',
            profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWqIODNMh2fpOtfun6Spu3rkMKa-nEpAlVA&s',
        },
        imageUrl: 'https://i.pinimg.com/474x/71/87/ae/7187ae90ebd10dfe792ea74fef6b41ce.jpg',
        isLiked: false,
        comments: [
            { user: 'Tom', text: 'Amazing view!' },
            { user: 'Lia', text: 'Enjoy your vacay!' },
        ],
        description: 'Beautiful sunset at the beach'
    },
    {
        id: 8,
        user: {
            username: 'Sarah',
            profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOmlcrEfYZdBUHVwXggzrQiS9gyYH_FTOogg&s',
        },
        imageUrl: 'https://t4.ftcdn.net/jpg/05/68/63/11/360_F_568631153_ygTLlsjLeVtMrGDSUbqia6VD2GsdbHJx.jpg',
        isLiked: false,
        comments: [
            { user: 'John', text: 'Nice!', fontWeight: "bold" },
            { user: 'Mike', text: 'Cool!' },
            { user: 'Adam', text: 'The GOAT' },
        ],
        description: 'Beautiful sunset at the beach'
    },
    {
        id: 9,
        user: {
            username: 'Adam',
            profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJZ38cGhD4JYl3jwI1QTGz6W04QNcgGto3Ug&s',
        },
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLqJE2BxKJRG-PSI9SR3jG3HmCcVj2Ye80zA&s',
        isLiked: false,
        comments: [
            { user: 'John', text: 'Congratulations!', fontWeight: "bold" },
            { user: 'Mike', text: 'Lets goo!' },
        ],
    },
    {
        id: 10,
        user: {
            username: 'Ashley',
            profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWqIODNMh2fpOtfun6Spu3rkMKa-nEpAlVA&s',
        },
        imageUrl: 'https://i.pinimg.com/474x/71/87/ae/7187ae90ebd10dfe792ea74fef6b41ce.jpg',
        isLiked: false,
        comments: [
            { user: 'Tom', text: 'Amazing view!' },
            { user: 'Lia', text: 'Enjoy your vacay!' },
        ],
        description: 'Beautiful sunset at the beach'
    },
    {
        id: 11,
        user: {
            username: 'Sarah',
            profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOmlcrEfYZdBUHVwXggzrQiS9gyYH_FTOogg&s',
        },
        imageUrl: 'https://t4.ftcdn.net/jpg/05/68/63/11/360_F_568631153_ygTLlsjLeVtMrGDSUbqia6VD2GsdbHJx.jpg',
        isLiked: false,
        comments: [
            { user: 'John', text: 'Nice!', fontWeight: "bold" },
            { user: 'Mike', text: 'Cool!' },
            { user: 'Adam', text: 'The GOAT' },
        ],
        description: 'Beautiful sunset at the beach'
    },
    {
        id: 12,
        user: {
            username: 'Adam',
            profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJZ38cGhD4JYl3jwI1QTGz6W04QNcgGto3Ug&s',
        },
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLqJE2BxKJRG-PSI9SR3jG3HmCcVj2Ye80zA&s',
        isLiked: false,
        comments: [
            { user: 'John', text: 'Congratulations!', fontWeight: "bold" },
            { user: 'Mike', text: 'Lets goo!' },
        ],
    },
];


const ExploreScreen = () => {
    const [posts, setPosts] = useState([]);
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [showFullScreenImage, setShowFullScreenImage] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [selectedPostId, setSelectedPostId] = useState(null);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const lastPressRef = useRef(0);
    const gestureY = useRef(new Animated.Value(0)).current;

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

    const handleFavorite = (postId) => {
        const updatedPosts = posts.map((post) =>
            post.id === postId ? { ...post, isFavorited: !post.isFavorited } : post
        );
        setPosts(updatedPosts);
    };

    const openFullScreenImage = (post) => {
        setSelectedImageUrl(post.imageUrl);
        setSelectedPostId(post.id);
        setShowFullScreenImage(true);
    };

    const closeFullScreenImage = () => {
        setShowFullScreenImage(false);
        setSelectedImageUrl('');
        setSelectedPostId(null);
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
            <Pressable onPress={() => openFullScreenImage(item)}>
                <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
            </Pressable>
            <View style={styles.overlayContainer}>
                <Image
                    source={{ uri: item.user.profilePic || 'https://via.placeholder.com/150' }}
                    style={styles.overlayProfilePic}
                />
                <Text style={styles.overlayUsername}>{item.user.username}</Text>
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

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2} // Set number of columns to 2
                columnWrapperStyle={styles.columnWrapper} // Ensure spacing between columns
                contentContainerStyle={styles.flatListContent}
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
                    <FlatList
                        data={selectedPost ? selectedPost.comments : []}
                        renderItem={({ item }) => (
                            <View style={styles.commentContainer}>
                                <Text style={styles.commentText}>
                                    <Text style={styles.commentUsername}>{item.user}</Text>
                                    : {item.text}
                                </Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
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
                        <Pressable
                            style={styles.fullScreenImageCloseButton}
                            onPress={closeFullScreenImage}
                        >
                            <Text style={styles.fullScreenImageCloseButtonText}>×</Text>
                        </Pressable>
                        <Image
                            source={{ uri: selectedImageUrl }}
                            style={styles.fullScreenImage}
                            resizeMode="contain"
                        />
                        {selectedPostId && (
                            <View style={styles.fullScreenActionsContainer}>
                                <TouchableWithoutFeedback onPress={() => handlePress(selectedPostId)}>
                                    <FontAwesome
                                        name={posts.find(post => post.id === selectedPostId).isLiked ? 'heart' : 'heart-o'}
                                        size={30}
                                        color={posts.find(post => post.id === selectedPostId).isLiked ? 'red' : 'white'}
                                        style={styles.actionIcon}
                                    />
                                </TouchableWithoutFeedback>
                                <Pressable onPress={() => openCommentsModal(posts.find(post => post.id === selectedPostId))}>
                                    <FontAwesome
                                        name="comment-o"
                                        size={30}
                                        color="white"
                                        style={styles.actionIcon}
                                    />
                                </Pressable>
                                <TouchableWithoutFeedback onPress={() => handleFavorite(selectedPostId)}>
                                    <FontAwesome
                                        name={posts.find(post => post.id === selectedPostId).isFavorited ? 'bookmark' : 'bookmark-o'}
                                        size={30}
                                        color={posts.find(post => post.id === selectedPostId).isFavorited ? 'yellow' : 'white'}
                                        style={styles.actionIcon}
                                    />
                                </TouchableWithoutFeedback>
                            </View>
                        )}
                    </View>
                </PanGestureHandler>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    postContainer: {
        flex: 1,
        margin: 4, // Adjust margin to fit 2 posts per line
        borderRadius: 5,
        overflow: 'hidden',
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
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    postImage: {
        width: '100%',
        height: 200, // Adjust height if needed
        borderRadius: 10,
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
        width: '100%',
        height: '80%',
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
    fullScreenActionsContainer: {
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        paddingHorizontal: 20,
    },
    actionIcon: {
        marginHorizontal: 10,
    },
    flatListContent: {
        paddingHorizontal: 4,
    },
});

export default ExploreScreen;
