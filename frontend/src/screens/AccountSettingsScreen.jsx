import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import ClickableOption from "../components/ClickableOption";

const AccountSettingsScreen = () => {

    const getUserId = async () => {
        try {
            const userId = await AsyncStorage.getItem('USER_ID');
            return userIdString ? JSON.parse(userIdString) : null;
        } catch (error) {
            console.error('Error retrieving user ID:', error);
            return null;
        }
    };
    
    const a = async () => 
    {
        const b = await AsyncStorage.getItem('USER_ID');
        return b;
    };
    console.log(JSON.parse(a));

    //console.log(getUserId);
    //console.log(userIdString);

    const userImageURL = async (userIdString) => {
        try {
            // Perform the GET request
            const response = await axios.get(`http://127.0.0.1:8000/api/users/${userIdString}`);

            // Extract the pfp_image from the response
            const pfpImage = response.data.pfp_image; // Adjust the key based on the actual response structure

            return pfpImage; // Return the profile picture URL or data
        } catch (error) {
            console.error('Error fetching user profile picture:', error);
            return null; // Handle error case (e.g., return null or a default image)
        }
    };

    // pfp_image

    // Styles:

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            // justifyContent -- VERTICAL
            // alignItems -- HORIZONTAL
            justifyContent: 'start',
        },
        profileCardShadowBox:
        {
            shadowColor: 'lightgray',
            shadowOffset: { width: -0.5, height: 6 },
            shadowOpacity: 0.7,
            shadowRadius: 2,
            elevation: 5
        },
        backButton:
        {
            height: 'fit-content',
            width: '90%',
            alignSelf: 'center',
            marginTop: 10,
            marginBottom: 5,

            color: 'rgba(0, 0, 0, 0.8)'

            //borderColor: 'red',
            //borderWidth: 3,
        },
        profileCard:
        {
            backgroundColor: 'white',
            flexDirection: 'row',
            height: 130,
            width: '90%',
            alignSelf: 'center',

            alignItems: 'center',
            padding: 10,

            borderColor: 'rgba(0, 0, 0, 0.4)',
            borderWidth: 0.2,
            borderRadius: 7,
        },
        profileImage:
        {
            height: 100,
            width: 100,
            borderRadius: 55,
            borderColor: 'lightgray',
            borderWidth: 2,
        },
        profileCardUsername:
        {
            marginLeft: 20,
            fontSize: 20,
            fontWeight: '600',
        },
        divider:
        {
            flexDirection: 'row',
            height: 1,
            width: '100%',
            alignSelf: 'center',

            borderColor: 'black',
            borderWidth: 1,
            marginTop: 20,
        },

    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { console.log('back button pressed') }}>
                <Icon name="chevron-left" size={30} style={styles.backButton}></Icon>
            </TouchableOpacity>
            <View style={styles.profileCardShadowBox}>
                <View style={styles.profileCard}>
                    <Image
                        source={{ uri: userImageURL }} // Use the fetched image URL
                        style={styles.profileImage}
                    />
                    <View>
                        <Text style={styles.profileCardUsername}>Helena</Text>
                    </View>
                </View>
            </View>
            <View style={styles.divider}></View>

            {/* List of settings: */}

            <ClickableOption iconName="edit" text="Edit Profile" onPress={() => { console.log('Edit Profile') }} />
            <ClickableOption iconName="bell" text="Notifications" onPress={() => { console.log('Notifications') }} />
            <ClickableOption iconName="lock" text="Privacy and Security" onPress={() => { console.log('Privacy') }} />
            <ClickableOption iconName="help-circle" text="Help and Support" onPress={() => { console.log('Help and Support') }} />
            <ClickableOption iconName="edit" text="About SafeSpace" onPress={() => { console.log('button pressed') }} />
            <ClickableOption iconName="log-out" text="Logout" textColor='#D60000' iconColor='#D60000' onPress={() => { console.log('button pressed') }} />

        </View>
    );




};


// <Text style={styles.clickableOptionName}></Text>
export default AccountSettingsScreen;