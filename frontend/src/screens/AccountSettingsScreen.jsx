import { React, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import ClickableOption from "../components/ClickableOption";
import axios from "axios";
import { fetchUserField } from "../fetchUserField";
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedGradient from "../components/AnimatedGradient";

const AccountSettingsScreen = () => {

    // Using utility function to fetch current user
    const userImageURL = fetchUserField('pfp_image');
    //const userFirstName = fetchUserField('first_name');
    const userFirstName = "Helena";
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
            marginBottom: 10,

            //borderColor: 'rgba(0, 0, 0, 0.4)',
            borderColor: 'transparent',
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
        profileCardUsernameContainer: 
        {
            justifyContent: 'center',
            paddingLeft: 15,
            height: '100%',
            width: 240,
            //borderColor: 'red',
            //borderWidth: 2,
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

            borderColor: '#333E',
            borderWidth: 1,
            marginTop: 20,
        },

    });


    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'start', paddingBottom: 1 }}>

            {/* Back button */}
            <TouchableOpacity onPress={() => { console.log('back button pressed') }}>
                <Icon name="chevron-left" size={30} style={styles.backButton}></Icon>
            </TouchableOpacity>

            {/* Shadow effect for profile card */}
            <View style={styles.profileCardShadowBox}>
                {/* gradient background matching SafeSpace theme */}
                <LinearGradient
                    colors={['#FFFFFF', 'rgba(200, 235, 225, 1)',]}
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

            {/* List of settings: */}

            <ClickableOption iconName="edit" text="Edit Profile" textColor='#333F' onPress={() => { console.log('Edit Profile') }} />
            <ClickableOption iconName="bell" text="Notifications" textColor='#333F' onPress={() => { console.log('Notifications') }} />
            <ClickableOption iconName="lock" text="Privacy and Security" textColor='#333F' onPress={() => { console.log('Privacy') }} />
            <ClickableOption iconName="help-circle" text="Help and Support" textColor='#333F' onPress={() => { console.log('Help and Support') }} />
            <ClickableOption iconName="info" text="About SafeSpace" textColor='#333F' onPress={() => { console.log('button pressed') }} />
            <ClickableOption iconName="log-out" text="Logout" textColor='#D60000' iconColor='#D60000' onPress={() => { console.log('button pressed') }} />

        </ScrollView>
    );




};


// <Text style={styles.clickableOptionName}></Text>
export default AccountSettingsScreen;