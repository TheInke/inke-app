import React from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import ClickableOption  from "../components/ClickableOption";

const AccountSettingsScreen = () => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    //const userProfilePicture = await axios.get('')
    
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
            <TouchableOpacity onPress={() => {console.log('back button pressed')}}>
                <Icon name="chevron-left" size={30} style={styles.backButton}></Icon>
            </TouchableOpacity>
            <View style={styles.profileCardShadowBox}>
                <View style={styles.profileCard}>
                    <View style={styles.profileImage}>
                    </View>
                    <View>
                        <Text style={styles.profileCardUsername}>Helena</Text>
                    </View>
                </View>
            </View>
            <View style={styles.divider}></View>

            {/* List of settings: */}

            <ClickableOption iconName="edit" text="Edit Profile" onPress={() => {console.log('Edit Profile')}} /> 
            <ClickableOption iconName="bell" text="Notifications" onPress={() => {console.log('Notifications')}} /> 
            <ClickableOption iconName="lock" text="Privacy and Security" onPress={() => {console.log('Privacy')}} /> 
            <ClickableOption iconName="help-circle" text="Help and Support" onPress={() => {console.log('Help and Support')}} /> 
            <ClickableOption iconName="edit" text="About SafeSpace" onPress={() => {console.log('button pressed')}} /> 
            <ClickableOption iconName="log-out" text="Logout" textColor='#D60000' iconColor='#D60000' onPress={() => {console.log('button pressed')}} /> 

        </View>
    );




};


// <Text style={styles.clickableOptionName}></Text>
export default AccountSettingsScreen;