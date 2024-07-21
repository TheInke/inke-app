import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Modal, Pressable, TextInput, Animated, ScrollView, TouchableWithoutFeedback, FlatList } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


// Mock data for posts
const mockPosts = [
    {
        id: 1,
        user: {
            username: 'Ashley',
            profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWqIODNMh2fpOtfun6Spu3rkMKa-nEpAlVA&s', // Empty profilePic to simulate missing profile picture
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
            profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOmlcrEfYZdBUHVwXggzrQiS9gyYH_FTOogg&s', // Empty profilePic to simulate missing profile picture
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
        id: 4,
        user: {
            username: 'Adam',
            profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJZ38cGhD4JYl3jwI1QTGz6W04QNcgGto3Ug&s', // Empty profilePic to simulate missing profile picture
        },
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLqJE2BxKJRG-PSI9SR3jG3HmCcVj2Ye80zA&s',
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
    {
        id: 7,
        user: {
            username: 'Tom',
            profilePic: 'data:image/jpeg;base64,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', // Empty profilePic to simulate missing profile picture
        },
        text: 'this is a text post! Just testing out to see if this really works.',
        imageUrl: null,
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
    const [activeTab, setActiveTab] = useState('ForYou');
    const [showFullScreenImage, setShowFullScreenImage] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const lastPressRef = useRef(0);
    const gestureY = useRef(new Animated.Value(0)).current;
    const [currentUserProfilePic, setCurrentUserProfilePic] = useState('https://via.placeholder.com/150');

    useEffect(() => {
        setPosts(mockPosts);
        setCurrentUserProfilePic('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTroSOiSqh5acX6IE2p04232ISBtkG5xREnjQ&s');
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
            <View style={styles.profileOverlayContainer}>
                <Image
                    source={{ uri: item.user.profilePic || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTroSOiSqh5acX6IE2p04232ISBtkG5xREnjQ&s' }}
                    style={styles.overlayProfilePic}
                />
                <Text style={styles.overlayUsername}>{item.user.username}</Text>
            </View>
            {item.imageUrl ? (
                <Pressable onPress={() => openFullScreenImage(item.imageUrl)}>
                    <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
                </Pressable>
            ) : (
                <View style={styles.textPostContainer}>
                    <Text style={styles.textPostContent}>{item.text}</Text>
                </View>
            )}
            <View style={styles.actionsContainer}>
                <TouchableWithoutFeedback onPress={() => handlePress(item.id)}>
                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <FontAwesome
                            name={item.isLiked ? 'heart' : 'heart-o'}
                            size={22}
                            color={item.isLiked ? 'red' : 'white'}
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <Pressable onPress={() => openCommentsModal(item)}>
                    <FontAwesome name="comment-o" size={22} color="white" />
                </Pressable>
                <Pressable onPress={() => handleFavorite(item.id)}>
                    <FontAwesome
                        name={item.isFavorited ? 'bookmark' : 'bookmark-o'}
                        size={22}
                        color={item.isFavorited ? 'yellow' : 'white'}
                    />
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

    const handleAddPost = () => {
        console.log('Add post functionality');
    };

    const handleProfilePress = () => {
        console.log('Profile button pressed');
    };

    const handleSearchPress = () => {
        console.log('Search button pressed');
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
                <View style={styles.overlay}>
                    <FlatList
                        data={posts}
                        renderItem={renderPost}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        columnWrapperStyle={styles.columnWrapper}
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
                                            <Text style={styles.commentUsername}>{item.user}</Text>: {item.text}
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
                                <Image
                                    source={{ uri: selectedImageUrl }}
                                    style={styles.fullScreenImage}
                                    resizeMode="contain"
                                />
                            </View>
                        </PanGestureHandler>
                    </Modal>
                </View>
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
            <View style={styles.bottomNavigationBar}>
                <Pressable onPress={handleSearchPress}>
                    <FontAwesome name="search" size={28} color="#FFFFFF" />
                </Pressable>
                <Pressable onPress={handleAddPost} style={styles.addPostButton}>
                    <FontAwesome name="plus" size={28} color="#000000" />
                </Pressable>
                <Pressable onPress={handleProfilePress}>
                    <Image
                        source={{ uri: currentUserProfilePic }}
                        style={styles.profilePic}
                    />
                </Pressable>
            </View>
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
    columnWrapper: {
        justifyContent: 'space-between',
    },
    postContainer: {
        flex: 1,
        margin: 8,
        borderRadius: 5,
        overflow: 'hidden',
    },
    textPostContainer: {
        padding: 54,
        borderRadius: 10,
        backgroundColor: '#1c1c1c',
        width: '100%',
        maxHeight: 300,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    textPostContent: {
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    profileOverlayContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        borderRadius: 5,
        zIndex: 1,
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
        height: 250,
        borderRadius: 10,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginTop: 0,
        marginBottom: 6,
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
        width: '100%',
        height: '100%',
    },
    tabContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomNavigationBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#000000',
        position: 'absolute',
        bottom: 1,
        width: '100%',
        height: 55,
    },
    addPostButton: {
        backgroundColor: '#FFFFFF',
        padding: 7,
        borderRadius: 30,
        position: 'absolute',
        bottom: 5,
        left: '50%',
        zIndex: 1,
    },
    profilePic: {
        width: 45,
        height: 45,
        borderRadius: 19,
        borderColor: '#FFFFFF',
    },
    bottomBarIcon: {
        width: 24,
        height: 24,
    },
});

export default HomePage;
