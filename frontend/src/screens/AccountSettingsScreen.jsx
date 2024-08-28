import { React, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import ClickableOption from "../components/ClickableOption";
import axios from "axios";
import { fetchUserField } from "../services/fetchUserField";
import { LinearGradient } from 'expo-linear-gradient';

const AccountSettingsScreen = () => {

    // Using utility function to fetch current user
    const userImageURL = fetchUserField('pfp_image');
    const userFirstName = fetchUserField('first_name');
    console.log(userFirstName)

    if (userImageURL === false) {
        console.log('Error fetching user profile image: either user or field does not exist');
    }
    if (userFirstName === false) {
        console.log('Error fetching user first name: either user or field does not exist');
    }
    // console.log(userImageURL);


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
            shadowOffset: { width: -4, height: 6 },
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
            backgroundColor: 'rgba(176, 219, 209, 0.6)',
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
        gradient:
        {
            position: 'absolute',
            flexDirection: 'row',
            height: 130,
            width: '90%',
            alignSelf: 'center',

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
            
            {/* Back button */}
            <TouchableOpacity onPress={() => { console.log('back button pressed') }}>
                <Icon name="chevron-left" size={30} style={styles.backButton}></Icon>
            </TouchableOpacity>
            
            {/* Shadow effect for profile card */}
            <View style={styles.profileCardShadowBox}>
                {/* gradient background matching SafeSpace theme */}
                <LinearGradient 
                    colors={['#FFFFFF', 'rgba(176, 219, 209, 0.8)',]} 
                    start={[0, 0]} end={[1, 1]}     
                    style={styles.profileCard}>
                    <Image
                        source={{ uri: userImageURL }}
                        style={styles.profileImage}
                    />
                    <View>
                        <Text style={styles.profileCardUsername}>Welcome, {userFirstName}</Text>
                    </View>
                </LinearGradient>
            </View>

            {/* Divider line */}
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