import React, { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  Animated,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { API_URL } from "../../../../constants";
import { fetchWithTokenRefresh } from "../../../../services/api";
import { fetchUserField } from "../../../../services/fetchUserField";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [activeTab, setActiveTab] = useState("ForYou");
  const [showFullScreenImage, setShowFullScreenImage] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [animations, setAnimations] = useState({});
  const lastPressRef = useRef(0);
  const [currentUserProfilePic, setCurrentUserProfilePic] = useState(
    "https://via.placeholder.com/150"
  );
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(false); // Add this state to handle loading
  const [refreshing, setRefreshing] = useState(false);
  const username = fetchUserField("username");

  {
    loading && <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Fetch the token from AsyncStorage
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem("ACCESS_TOKEN");
        if (token) {
          setAccessToken(token);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };
    fetchAccessToken();
  }, []);

  const fetchPosts = async () => {
    setLoading(true); // Start loading
    setRefreshing(true); // Start refreshing
    try {
      const response = await fetchWithTokenRefresh(`${API_URL}/posts/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response;

      // Combine the new data with the old posts, avoiding duplicates
      setPosts((prevPosts) => {
        const newPosts = data.filter(
          (post) => !prevPosts.some((p) => p.id === post.id)
        ); // Avoid duplicates
        return [...newPosts, ...prevPosts]; // Prepend new posts
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false); // Stop loading
      setRefreshing(false);
    }
  };

  // Fetch posts once when accessToken is available
  useEffect(() => {
    if (accessToken) {
      fetchPosts();
    }
  }, [accessToken]);

  // Handle scroll event to fetch new posts when scrolling to the top
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY <= 0 && !loading) {
      fetchPosts(); // Fetch new posts if scrolled to top and not loading
    }
  };
  const handleRefresh = () => {
    if (!loading) {
      fetchPosts(); // Fetch new posts
    }
  };

  // Handle like post
  const handleLike = async (postId) => {
    try {
      const updatedPosts = posts.map((post) =>
        post.id === postId ? { ...post, isLiked: !post.isLiked } : post
      );
      setPosts(updatedPosts);

      await fetch(`${API_URL}/posts/${postId}/like/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isLiked: !updatedPosts.find((post) => post.id === postId).isLiked,
        }),
      });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleFavorite = async (postId) => {
    try {
      const updatedPosts = posts.map((post) =>
        post.id === postId ? { ...post, isFavorited: !post.isFavorited } : post
      );
      setPosts(updatedPosts);

      await fetch(`${API_URL}/posts/${postId}/favorite/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isFavorited: !updatedPosts.find((post) => post.id === postId)
            .isFavorited,
        }),
      });
    } catch (error) {
      console.error("Error favoriting post:", error);
    }
  };

  const openFullScreenImage = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setShowFullScreenImage(true);
  };

  const closeFullScreenImage = () => {
    setShowFullScreenImage(false); // Close the modal
    setTimeout(() => {
      setSelectedImageUrl(""); // Reset the image URL after the modal is closed
    }, 300); // Give a small delay to ensure the modal is closed before resetting the URL
  };

  const onGestureEvent = (event) => {
    if (event.nativeEvent.translationY > 100) {
      closeFullScreenImage();
    }
  };

  const handlePress = (postId) => {
    handleLike(postId);

    if (!animations[postId]) {
      const scaleAnim = new Animated.Value(1);
      setAnimations((prev) => ({ ...prev, [postId]: scaleAnim }));

      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(animations[postId], {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(animations[postId], {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.profileOverlayContainer}>
        <Image
          source={{
            uri: item.user?.profilePic || "https://via.placeholder.com/150",
          }} // Safely access `profilePic`
          style={styles.overlayProfilePic}
        />
        <Text style={styles.overlayUsername}>
          {item.user ? item.user : "Anonymous"}{" "}
          {/* Directly use item.user as the username */}
        </Text>
      </View>
      {item.file ? (
        <Pressable onPress={() => openFullScreenImage(item.file)}>
          <Image source={{ uri: item.file }} style={styles.postImage} />
        </Pressable>
      ) : (
        <View style={styles.textPostContainer}>
          <Text style={styles.textPostContent}>{item.content}</Text>
        </View>
      )}
      <View style={styles.actionsContainer}>
        <TouchableWithoutFeedback onPress={() => handlePress(item.id)}>
          <Animated.View
            style={{
              transform: [
                { scale: animations[item.id] || new Animated.Value(1) },
              ],
            }}
          >
            <FontAwesome
              name={item.isLiked ? "heart" : "heart-o"}
              size={20}
              color={item.isLiked ? "red" : "black"}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        <Pressable onPress={() => openCommentsModal(item)}>
          <FontAwesome name="comment-o" size={20} color="black" />
        </Pressable>
        <Pressable onPress={() => handleFavorite(item.id)}>
          <FontAwesome
            name={item.isFavorited ? "bookmark" : "bookmark-o"}
            size={20}
            color={item.isFavorited ? "yellow" : "black"}
          />
        </Pressable>
      </View>
    </View>
  );

  const openCommentsModal = (post) => {
    setSelectedPost(post);
    setShowCommentsModal(true);

    // Fetch comments for the selected post
    fetchComments(post.id);
  };

  const closeCommentsModal = () => {
    setShowCommentsModal(false);
    setSelectedPost(null);
  };

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/posts/${postId}/comments/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handlePostComment = async (postId) => {
    try {
        const response = await fetch(`${API_URL}/posts/${postId}/comments/create/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: commentText }),
        });

        if (response.ok) {
            const newComment = await response.json();
            setCommentText('');  // Clear input field

            // Fetch comments again to ensure the UI is up to date
            fetchComments(postId);
        } else {
            const errorText = await response.text();
            console.error("Error posting comment:", errorText);
        }
    } catch (error) {
        console.error("Error posting comment:", error);
    }
};


  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <Pressable
          style={[styles.tab, activeTab === "Following" && styles.activeTab]}
          onPress={() => handleTabPress("Following")}
        >
          <Text style={styles.tabText}>Following</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === "ForYou" && styles.activeTab]}
          onPress={() => handleTabPress("ForYou")}
        >
          <Text style={styles.tabText}>For You</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === "Favorites" && styles.activeTab]}
          onPress={() => handleTabPress("Favorites")}
        >
          <Text style={styles.tabText}>Favorites</Text>
        </Pressable>
      </View>
      {activeTab === "ForYou" && (
        <View style={styles.overlay}>
          <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            onRefresh={handleRefresh} // Pull to refresh
            refreshing={refreshing} // Control refreshing state
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
                data={comments}
                renderItem={({ item }) => (
                  <View style={styles.commentContainer}>
                    <Text style={styles.commentText}>
                      <Text style={styles.commentUsername}>
                        {item.username}
                      </Text>
                      : {item.text}
                    </Text>
                  </View>
                )}
                keyExtractor={(item, index) =>
                  item.id ? item.id.toString() : index.toString()
                } // Ensure unique keys
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
                  onPress={() => handlePostComment(selectedPost.id)}
                >
                  <Text style={styles.addCommentButtonText}>Send</Text>
                </Pressable>
              </View>
              <Pressable
                style={styles.closeModalButton}
                onPress={closeCommentsModal}
              >
                <Text style={styles.closeModalButtonText}>Close</Text>
              </Pressable>
            </View>
          </Modal>

          <Modal
            visible={showFullScreenImage}
            transparent={true}
            onRequestClose={closeFullScreenImage}
          >
            <PanGestureHandler onGestureEvent={onGestureEvent}>
              <View style={styles.fullScreenImageContainer}>
                {/* Conditionally render the image */}
                {selectedImageUrl ? (
                  <TouchableWithoutFeedback onPress={closeFullScreenImage}>
                    <Image
                      source={{ uri: selectedImageUrl }}
                      style={styles.fullScreenImage}
                    />
                  </TouchableWithoutFeedback>
                ) : null}

                {/* Close Button at the bottom */}
                <TouchableOpacity
                  style={styles.closeButtonBottom}
                  onPress={closeFullScreenImage}
                >
                  <Text style={styles.closeButtonTextBottom}>Close</Text>
                </TouchableOpacity>
              </View>
            </PanGestureHandler>
          </Modal>
        </View>
      )}
      {activeTab === "Following" && (
        <View style={styles.tabContent}>
          <Text>Following Content</Text>
        </View>
      )}
      {activeTab === "Favorites" && (
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
    backgroundColor: "#FFFFFF",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 2,
    paddingBottom: 1,
    zIndex: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabText: {
    color: "black",
    fontSize: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#BFAC98",
  },
  overlay: {
    flex: 1,
    padding: 8,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginHorizontal: -15,
    marginTop: -15,
  },
  postContainer: {
    flex: 1,
    margin: 8,
    overflow: "hidden",
  },
  textPostContainer: {
    padding: 54,
    backgroundColor: "#1c1c1c",
    width: "100%",
    maxHeight: 300,
    overflow: "hidden",
    justifyContent: "center",
  },
  textPostContent: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
  },
  profileOverlayContainer: {
    position: "absolute",
    top: 5,
    left: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 3,
    zIndex: 1,
  },
  overlayProfilePic: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  overlayUsername: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  postImage: {
    width: "100%",
    height: 250,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 7,
    marginBottom: 6,
  },
  commentsLink: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50%",
    backgroundColor: "#1c1c1c",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 10,
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  divider: {
    height: 1,
    backgroundColor: "#333333",
    width: "100%",
    marginVertical: 10,
  },
  commentsScrollView: {
    flex: 1,
  },
  commentContainer: {
    padding: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: "#1c1c1c",
  },
  commentText: {
    color: "#FFFFFF",
  },
  commentUsername: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#333333",
    color: "#FFFFFF",
  },
  addCommentButton: {
    marginLeft: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  addCommentButtonText: {
    color: "#000000",
    fontWeight: "bold",
  },
  closeModalButton: {
    alignItems: "center",
    paddingVertical: 10,
  },
  closeModalButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  fullScreenImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  fullScreenImage: {
    width: "90%",
    height: "80%",
  },
  closeButtonBottom: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 20,
  },
  closeButtonTextBottom: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  tabContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomNavigationBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    position: "absolute",
    bottom: 1,
    width: "100%",
    height: 50,
  },
  addPostButton: {
    backgroundColor: "#FFFFFF",
    padding: 7,
    borderRadius: 30,
    position: "absolute",
    bottom: 5,
    left: "50%",
    zIndex: 1,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 19,
    borderColor: "#FFFFFF",
  },
});

export default HomePage;
