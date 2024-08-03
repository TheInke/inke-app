import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Modal, Pressable, TextInput, Animated, FlatList, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MasonryList from 'react-native-masonry-list';

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
        setSelectedImageUrl(post.uri);
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
            <MasonryList
                images={posts.map(post => ({
                    ...post,
                    uri: post.imageUrl,
                }))}
                imageContainerStyle={styles.postContainer}
                
                onPressImage={(data) => openFullScreenImage(data)}
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
                            <>
                                <View style={styles.posterInfoContainer}>
                                    <Image
                                        source={{ uri: posts.find(post => post.id === selectedPostId).user.profilePic }}
                                        style={styles.posterProfilePic}
                                    />
                                    <Text style={styles.posterUsername}>
                                        {posts.find(post => post.id === selectedPostId).user.username}
                                    </Text>
                                </View>
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
                                        <FontAwesome name="comment-o" size={30} color="white" style={styles.actionIcon} />
                                    </Pressable>
                                    <TouchableWithoutFeedback onPress={() => handleFavorite(selectedPostId)}>
                                        <FontAwesome
                                            name={posts.find(post => post.id === selectedPostId).isFavorited ? 'bookmark' : 'bookmark-o'}
                                            size={30}
                                            color={posts.find(post => post.id === selectedPostId).isFavorited ? 'gold' : 'white'}
                                            style={styles.actionIcon}
                                        />
                                    </TouchableWithoutFeedback>
                                </View>
                            </>
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
   
    postContainer: { marginBottom: 0 },
    
    
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
    commentContainer: { marginBottom: 10 },
    commentText: { color: '#fff' },
    commentUsername: { fontWeight: 'bold' },
    commentInputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    commentInput: {
        flex: 1,
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#fff',
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
    closeModalButton: { marginTop: 10, alignItems: 'center' },
    closeModalButtonText: { color: '#fff', fontWeight: 'bold' },
    fullScreenImageContainer: {
        flex: 1,
        justifyContent: 'flex-start', 
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    fullScreenImageCloseButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 20,
        zIndex: 1, 
    },
    fullScreenImageCloseButtonText: { color: '#fff', fontSize: 30 },
    fullScreenImage: {
        width: '100%',
        height: '80%',
    },
    fullScreenActionsContainer: {
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        zIndex: 0, 
    },
    actionIcon: { marginHorizontal: 20 },
    posterInfoContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    posterProfilePic: { width: 40, height: 40, borderRadius: 20 },
    posterUsername: { color: '#fff', marginLeft: 10, fontSize: 16 },
});


export default ExploreScreen;
