import React, { useState, useEffect } from 'react';
import { View, Switch, Button, Text, Alert, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';  // Import navigation hook

const NotificationSettingsScreen = () => {
  const [notifications, setNotifications] = useState({
    follow: false,
    postCreation: false,
    postLike: false,
    comment: false,
    socialCircle: false,
    screenTimeAlert: false,
  });

  const [permissionGranted, setPermissionGranted] = useState(false);
  const navigation = useNavigation();  // Initialize navigation

  useEffect(() => {
    // Fetch saved settings from AsyncStorage (or backend)
    const fetchSettings = async () => {
      const savedSettings = await AsyncStorage.getItem('notificationSettings');
      if (savedSettings) {
        setNotifications(JSON.parse(savedSettings));
      }
    };
    fetchSettings();
  }, []);

  const toggleNotification = async (type) => {
    const updatedNotifications = {
      ...notifications,
      [type]: !notifications[type],
    };
    setNotifications(updatedNotifications);

    // Save settings after each toggle (e.g., in AsyncStorage or backend)
    await AsyncStorage.setItem('notificationSettings', JSON.stringify(updatedNotifications));

    // Request notification permission if it's the first time any notification is turned on
    if (!permissionGranted && updatedNotifications[type]) {
      requestNotificationPermission();
    }
  };

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        Alert.alert("Permission required", "Notification access is required to send alerts.");
      } else {
        setPermissionGranted(true);
        Alert.alert("Permission granted", "Notifications are now enabled.");
      }
    } else {
      setPermissionGranted(true);
      Alert.alert("Permission granted", "Notifications are already enabled.");
    }
  };

  const saveSettings = () => {
    Alert.alert('Settings saved');
    navigation.goBack();  // Navigate back to the previous screen
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notification Settings</Text>

      <View style={styles.notificationRow}>
        <Text style={styles.label}>Follow Notification</Text>
        <Switch
          value={notifications.follow}
          onValueChange={() => toggleNotification('follow')}
        />
      </View>

      <View style={styles.notificationRow}>
        <Text style={styles.label}>Post Creation Notification</Text>
        <Switch
          value={notifications.postCreation}
          onValueChange={() => toggleNotification('postCreation')}
        />
      </View>

      <View style={styles.notificationRow}>
        <Text style={styles.label}>Post Like Notification</Text>
        <Switch
          value={notifications.postLike}
          onValueChange={() => toggleNotification('postLike')}
        />
      </View>

      <View style={styles.notificationRow}>
        <Text style={styles.label}>Comment Notification</Text>
        <Switch
          value={notifications.comment}
          onValueChange={() => toggleNotification('comment')}
        />
      </View>

      <View style={styles.notificationRow}>
        <Text style={styles.label}>Social Circle Join Notification</Text>
        <Switch
          value={notifications.socialCircle}
          onValueChange={() => toggleNotification('socialCircle')}
        />
      </View>

      <View style={styles.notificationRow}>
        <Text style={styles.label}>Screen Time Alert</Text>
        <Switch
          value={notifications.screenTimeAlert}
          onValueChange={() => toggleNotification('screenTimeAlert')}
        />
      </View>

      <Button title="Save Settings" onPress={saveSettings} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 1,
  },
  label: {
    fontSize: 16,
  },
});

export default NotificationSettingsScreen;
