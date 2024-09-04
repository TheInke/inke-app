import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ClickableOption from "../../../../components/ClickableOption";
import { useNavigation } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import { fetchUserField } from "../../../../services/fetchUserField";
import { LinearGradient } from 'expo-linear-gradient';

// Import the screens
import AboutSafeSpaceScreen from "./AboutSafeSpaceScreen";
import EditProfileScreen from "./EditProfileScreen";
import NotificationsScreen from "./NotificationsScreen";
import PrivacyAndSecurityScreen from "./PrivacyAndSecurityScreen";
import HelpAndSupportScreen from "./HelpAndSupportScreen";

const Stack = createStackNavigator();

const AccountSettingsScreenComponent = () => {
    const navigation = useNavigation(); 

    // Using utility function to fetch current user
    const userImageURL = fetchUserField('pfp_image');
    const userFirstName = fetchUserField('first_name');

    if (userImageURL === false) {
        console.log('Error fetching user profile image: either user or field does not exist');
    }
    if (userFirstName === false) {
        console.log('Error fetching user first name: either user or field does not exist');
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'start',
        },
        profileCardShadowBox: {
            shadowColor: 'lightgray',
            shadowOffset: { width: -4, height: 6 },
            shadowOpacity: 0.7,
            shadowRadius: 2,
            elevation: 5
        },
        backButton: {
            height: 'fit-content',
            width: '90%',
            alignSelf: 'center',
            marginTop: 10,
            marginBottom: 5,
            color: 'rgba(0, 0, 0, 0.8)'
        },
        profileCard: {
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
            borderRadius: 55,
            borderColor: 'lightgray',
            borderWidth: 2,
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
            borderColor: 'black',
            borderWidth: 1,
            marginTop: 20,
        },
    });

    return (
        <View style={styles.container}>
            {/* Back button */}
            {/* <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={30} style={styles.backButton} />
            </TouchableOpacity> */}

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
            <ClickableOption iconName="edit" text="Edit Profile" onPress={() => navigation.navigate('EditProfileScreen')} />
            <ClickableOption iconName="bell" text="Notifications" onPress={() => navigation.navigate('NotificationsScreen')} />
            <ClickableOption iconName="lock" text="Privacy and Security" onPress={() => navigation.navigate('PrivacyAndSecurityScreen')} />
            <ClickableOption iconName="help-circle" text="Help and Support" onPress={() => navigation.navigate('HelpAndSupportScreen')} />
            <ClickableOption iconName="edit" text="About SafeSpace" onPress={() => navigation.navigate('AboutSafeSpaceScreen')} />
            <ClickableOption iconName="log-out" text="Logout" textColor='#D60000' iconColor='#D60000' onPress={() => navigation.navigate('LogoutScreen')} />
        </View>
    );
};

const AccountSettingsScreen = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="minAccountSettings" 
            component={AccountSettingsScreenComponent}
            options={{
                headerTitle: 'Account Settings',
            }}
        />
        <Stack.Screen 
            name="EditProfileScreen" 
            component={EditProfileScreen} 
            options={({ navigation }) => ({
                headerTitle: 'Edit Profile',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={25} style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                ),
            })}
        />
        <Stack.Screen 
            name="NotificationsScreen" 
            component={NotificationsScreen} 
            options={({ navigation }) => ({
                headerTitle: 'Notifications',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={25} style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                ),
            })}
        />
        <Stack.Screen 
            name="PrivacyAndSecurityScreen" 
            component={PrivacyAndSecurityScreen} 
            options={({ navigation }) => ({
                headerTitle: 'Privacy and Security',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={25} style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                ),
            })}
        />
        <Stack.Screen 
            name="HelpAndSupportScreen" 
            component={HelpAndSupportScreen} 
            options={({ navigation }) => ({
                headerTitle: 'Help and Support',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={25} style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                ),
                
            })}
        />
        <Stack.Screen 
            name="AboutSafeSpaceScreen" 
            component={AboutSafeSpaceScreen} 
            options={({ navigation }) => ({
                headerTitle: 'About SafeSpace',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={25} style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    backButton: {
        marginLeft: 15,
    },
});

export default AccountSettingsScreen;
