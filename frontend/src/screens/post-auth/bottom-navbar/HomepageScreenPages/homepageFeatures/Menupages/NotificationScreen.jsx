// NotificationScreen.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationScreen = () => (
    <View style={styles.container}>
        <Text style={styles.text}>Welcome to the Notification Screen</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
});

export default NotificationScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

// // Mock data for notifications
// const mockNotifications = [
//   {
//     id: 1,
//     type: 'like', // type of notification, you can also have 'comment', 'follow' etc.
//     user: {
//       username: 'Ashley',
//       profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWqIODNMh2fpOtfun6Spu3rkMKa-nEpAlVA&s',
//     },
//     content: 'Ashley liked your post',
//     timestamp: '2m ago',
//   },
//   {
//     id: 2,
//     type: 'comment',
//     user: {
//       username: 'Sarah',
//       profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOmlcrEfYZdBUHVwXggzrQiS9gyYH_FTOogg&s',
//     },
//     content: 'Sarah commented: "This is amazing!"',
//     timestamp: '5m ago',
//   },
//   {
//     id: 3,
//     type: 'follow',
//     user: {
//       username: 'Tom',
//       profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWqIODNMh2fpOtfun6Spu3rkMKa-nEpAlVA&s',
//     },
//     content: 'Tom started following you',
//     timestamp: '10m ago',
//   },
// ];

// const NotificationScreen = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     // Simulate fetching notifications
//     setNotifications(mockNotifications);
//   }, []);

//   const renderNotification = ({ item }) => (
//     <View style={styles.notificationContainer}>
//       <Image source={{ uri: item.user.profilePic }} style={styles.profilePic} />
//       <View style={styles.notificationContent}>
//         <Text style={styles.notificationText}>
//           <Text style={styles.username}>{item.user.username}</Text> {item.content}
//         </Text>
//         <Text style={styles.timestamp}>{item.timestamp}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={notifications}
//         renderItem={renderNotification}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   listContainer: {
//     paddingVertical: 20,
//   },
//   notificationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   profilePic: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   notificationContent: {
//     flex: 1,
//   },
//   notificationText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   username: {
//     fontWeight: 'bold',
//   },
//   timestamp: {
//     fontSize: 12,
//     color: '#888',
//     marginTop: 5,
//   },
// });

// export default NotificationScreen;
