import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { fetchUserData, updateUserProfile } from '../services/api'; // Import fetchUserData and updateUserProfile functions from api.js
import { fetchUserField } from "../fetchUserField";
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',

        //borderColor: 'red',
        //borderWidth: 2,
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
    editProfileImageContainer:
    {
        backgroundColor: 'white',
        height: 140,
        width: '90%',
        alignSelf: 'center',

        alignItems: 'center',
        padding: 10,
        marginBottom: 10,

        borderColor: 'black',
        borderWidth: 1,
    },
    profileImage:
    {
        height: 80,
        width: 80,
        borderRadius: 40,
        borderColor: 'lightgray',
        borderWidth: 2,
    },
    editProfileLink: 
    {
        color: '#6CBCC0',
        fontWeight: '700',
        fontSize: 17,
        marginTop: 10,
        borderBlockColor: 'black'
    },
})

const EditProfileScreen = () => {

    const userImageURL = fetchUserField('pfp_image');
    if (userImageURL === false) {
        console.log('Error fetching user profile image: either user or field does not exist');
    }


    return (
        <ScrollView style={styles.container}>
            <Icon name='chevron-left' size={30} style={styles.backButton}></Icon>
            <View style={styles.editProfileImageContainer}>
                <Image
                    source={{ uri: userImageURL }}
                    style={styles.profileImage}
                />
                <TouchableOpacity>
                    <Text style={styles.editProfileLink}>Edit profile image</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default EditProfileScreen;
