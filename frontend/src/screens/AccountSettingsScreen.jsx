import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import ClickableOption from "../components/ClickableOption";
import axios from "axios";
import { fetchUserField } from "../fetchUserField"; // Keep this for utility function
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedGradient from "../components/AnimatedGradient";

const AccountSettingsScreen = () => {
  // State for user data
  const [userImageURL, setUserImageURL] = useState(null);
  const [userFirstName, setUserFirstName] = useState(null);
  const [error, setError] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const imageURL = await fetchUserField('pfp_image');
        const firstName = await fetchUserField('first_name');
        
        setUserImageURL(imageURL);
        setUserFirstName(firstName);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  // Check for errors or loading states
  if (error) {
    return <Text>Error loading user data</Text>;
  }

  // Styles:
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    profileCardShadowBox: {
      shadowColor: 'lightgray',
      shadowOffset: { width: -4, height: 6 },
      shadowOpacity: 0.7,
      shadowRadius: 2,
      elevation: 5,
    },
    backButton: {
      height: 'fit-content',
      width: '90%',
      alignSelf: 'center',
      marginTop: 10,
      marginBottom: 5,
      color: 'rgba(0, 0, 0, 0.8)',
    },
    profileCard: {
      flexDirection: 'row',
      height: 130,
      width: '90%',
      alignSelf: 'center',
      alignItems: 'center',
      padding: 10,
      marginTop: 20,
      marginBottom: 10,
      borderColor: 'transparent',
      borderWidth: 0.2,
      borderRadius: 7,
    },
    gradient: {
      position: 'absolute',
      flexDirection: 'row',
      height: 130,
      width: '90%',
      alignSelf: 'center',
      borderColor: 'rgba(0, 0, 0, 0.4)',
      borderWidth: 0.2,
      borderRadius: 7,
    },
    profileImage: {
      height: 100,
      width: 100,
      borderRadius: 50,
      borderColor: 'lightgray',
      borderWidth: 2,
    },
    profileCardUsernameContainer: {
      justifyContent: 'center',
      paddingLeft: 15,
      height: '100%',
      width: 240,
    },
    profileCardUsername: {
      marginLeft: 20,
      fontSize: 20,
      fontWeight: '600',
    },
    divider: {
      flexDirection: 'row',
      height: 1,
      width: '100%',
      alignSelf: 'center',
      borderColor: '#333E',
      borderWidth: 1,
      marginTop: 20,
    },
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'start', paddingBottom: 1 }}>
      {/* Shadow effect for profile card */}
      <View style={styles.profileCardShadowBox}>
        {/* Gradient background matching SafeSpace theme */}
        <LinearGradient
          colors={['#FFFFFF', 'rgba(160, 235, 225, 1)']}
          start={[0, 0]} end={[1, 1]}
          style={styles.profileCard}>
          <Image
            source={{ uri: userImageURL }}
            style={styles.profileImage}
          />
          <View style={styles.profileCardUsernameContainer}>
            <Text style={styles.profileCardUsername}>Welcome, {userFirstName}</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Divider line */}
      <View style={styles.divider}></View>

      {/* List of settings */}
      <ClickableOption iconName="edit" text="Edit Profile" textColor='#333F' onPress={() => { console.log('Edit Profile') }} />
      <ClickableOption iconName="bell" text="Notifications" textColor='#333F' onPress={() => { console.log('Notifications') }} />
      <ClickableOption iconName="lock" text="Privacy and Security" textColor='#333F' onPress={() => { console.log('Privacy') }} />
      <ClickableOption iconName="help-circle" text="Help and Support" textColor='#333F' onPress={() => { console.log('Help and Support') }} />
      <ClickableOption iconName="info" text="About SafeSpace" textColor='#333F' onPress={() => { console.log('button pressed') }} />
      <ClickableOption iconName="log-out" text="Logout" textColor='#D60000' iconColor='#D60000' onPress={() => { console.log('button pressed') }} />
    </ScrollView>
  );
};

export default AccountSettingsScreen;
