import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Image, ScrollView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { fetchUserData, updateUserProfile } from '../services/api'; // Import fetchUserData and updateUserProfile functions from api.js
import { fetchUserField } from "../fetchUserField";
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

/* Temporary modal testing:

   modalContainer: {
       flex: 1,
       justifyContent: 'flex-end', // Position the modal at the bottom
       alignItems: 'center',
       backgroundColor: 'rgba(0, 0, 0, 0)', // Fully transparent

   },
   modalContent: {
       width: '100%', // Full width
       padding: 20,
       backgroundColor: 'white',
       borderTopLeftRadius: 20, // Rounded top corners
       borderTopRightRadius: 20,
       alignItems: 'center',

       borderColor: 'black',
       borderWidth: 1,
       borderRadius: 3,
   },
   closeModalButton: {
       marginTop: 20,
       color: '#6CBCC0',
       fontWeight: '700',
   },
   */


const EditProfileScreen = () => {

    const [pfpImageUrl, setPfpImageUrl] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [userLastName, setLastName] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);

    const [location, setLocation] = useState(null);
    const [bio, setBio] = useState(null);
    const [pronouns, setPronouns] = useState(null);


    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const imageURL = await fetchUserField('pfp_image');
                setPfpImageUrl(imageURL);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(err);
            }
        };
        fetchData();
    }, []);


    return (
        <ScrollView style={styles.container}>
            <View style={styles.editProfileImageContainer}>
                <Image
                    source={{ uri: pfpImageUrl }}
                    style={styles.profileImage}
                />
                <TouchableOpacity onPress={() => { console.log('edit profile image link pressed') }}>
                    <Text style={styles.editProfileLink}>Edit profile image</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.fieldNameContainer}>
                    <Text style={styles.fieldName}>Name</Text>
                    <Text style={styles.fieldName}>Username</Text>
                    <Text style={styles.fieldName}>Pronouns</Text>
                    
                    <Text style={styles.fieldName}></Text>

                    <Text style={styles.fieldName}>Email</Text>
                    <Text style={styles.fieldName}>Location</Text>
                    
                    <Text style={styles.fieldName}></Text>
                    
                    <Text style={styles.fieldName}>Bio</Text>
                </View>
            </View>

        </ScrollView>
    );
};


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
    editProfileImageContainer:
    {
        backgroundColor: 'white',
        height: 140,
        width: '90%',
        alignSelf: 'center',

        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        marginTop: 10,

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
    bottomContainer:
    {
        height: 500,
        width: '90%',
        flex: 1,
        alignSelf: 'center',
        alignItems: 'start',

        borderColor: 'red',
        borderWidth: 2,
    },
    fieldNameContainer: 
    {
        flex: 1,
        width: '30%',
        borderColor: 'green',
        borderWidth: 2,
    },
    fieldValueContainer: 
    {
        height: 300,
        width: '30%',
        borderColor: 'green',
        borderWidth: 2,
    },
    fieldName:
    {
        width: 'fit-content',
        height: 'fit-content',
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 30,
    },
    fieldValue: 
    {
        fontSize: 17,
        fontWeight: 'bold',
        alignSelf: 'center'
    },

});

export default EditProfileScreen;
