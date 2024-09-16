import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomepageScreen from './screens/post-auth/bottom-navbar/HomepageScreenPages/HomepageScreen';
import LoginScreen from './screens/pre-auth/LoginScreen';
import ForgotPasswordScreen from './screens/pre-auth/ForgotPasswordScreen';
import SignupScreen from './screens/pre-auth/SignupScreen';
import SearchScreen from './screens/post-auth/bottom-navbar/SearchScreenPages/SearchScreen';
import ProfilePageScreen from './screens/post-auth/bottom-navbar/ProfilePageScreenPages/ProfilePageScreen';
import ProtectedRoute from './components/ProtectedRoute';
import CreatePostScreen from './screens/post-auth/bottom-navbar/CreatePostScreenPages/CreatePostScreen';
import ConnectionScreen from './screens/post-auth/bottom-navbar/ConnectionScreenPages/ConnectionScreen';
import MessageScreen from './screens/post-auth/bottom-navbar/HomepageScreenPages/homepageFeatures/MessageScreen';
import MenuScreen from './screens/post-auth/bottom-navbar/HomepageScreenPages/homepageFeatures/MenuScreen';
import AccountSettingsScreen from './screens/post-auth/bottom-navbar/AcountSettingsPages/AccountSettingsScreen';
import MeditationScreen from './screens/post-auth/bottom-navbar/HomepageScreenPages/homepageFeatures/Menupages/MeditationScreen';
import NotificationScreen from './screens/post-auth/bottom-navbar/HomepageScreenPages/homepageFeatures/Menupages/NotificationScreen';
import LiveStreamScreen from './screens/post-auth/bottom-navbar/HomepageScreenPages/homepageFeatures/Menupages/LiveStreamScreen';
import SocialCircleScreen from './screens/post-auth/bottom-navbar/ConnectionScreenPages/SocialCirclePages/SocialCircleScreen';
import ChatScreen from './screens/post-auth/bottom-navbar/HomepageScreenPages/homepageFeatures/ChatScreen';
import CreateSocialCircleScreen from './screens/post-auth/bottom-navbar/ConnectionScreenPages/SocialCirclePages/CreateSocialCircleScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }} // Hide the header for the login screen
        />
        <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }} // Hide the header for the forgot password screen
        />
        <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }} // Hide the header for the signup screen
        />
    </Stack.Navigator>
);

const CreatePostButton = ({ navigation }) => (
    <TouchableOpacity
        style={{
            width: 60,
            height: 60,
            alignItems: 'center',
            marginBottom: 10,
        }}
        onPress={() => navigation.navigate('CreatePost')}
    >
        <Ionicons name="create" size={30} color="black" style={styles.navItem} />
    </TouchableOpacity>
);

const EmptyScreen = () => <View />; // A placeholder component

const MainTab = ({ navigation }) => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, size }) => {
                let iconName;
                let iconColor = focused ? 'grey' : 'black'; // Black by default, grey when focused

                if (route.name === 'Home') {
                    iconName = 'grid';
                } else if (route.name === 'Search') {
                    iconName = 'search';
                } else if (route.name === 'Profile') {
                    iconName = 'person';
                } else if (route.name === 'Connection') {
                    iconName = 'people';
                }

                return <Ionicons name={iconName} size={size} color={iconColor} style={styles.navItem} />;
            },
            tabBarShowLabel: false, // Hide the labels under icons
        })}
    >
        <Tab.Screen 
            name="Home" 
            component={HomepageScreen} 
            options={{
                headerTitle: () => <Text style={[styles.headerTitle, {fontWeight: 'bold' }]}>Home</Text>,
                headerTitleAlign: 'left',
                headerLeft: null,
                headerRight: () => (
                    <View style={{ flexDirection: 'row', marginRight: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Message')} style={{ marginRight: 10 }}>
                            <Ionicons name="chatbubble-ellipses" size={25} color="black" style={styles.navItem} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                            <Ionicons name="menu" size={25} color="black" style={styles.navItem} />
                        </TouchableOpacity>
                    </View>
                ),
            }} 
        />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen
            name="CreatePostButton"
            component={EmptyScreen}
            options={{
                tabBarButton: (props) => <CreatePostButton {...props} navigation={navigation} />
            }}
        />
        <Tab.Screen 
            name="Connection" 
            component={ConnectionScreen}
            options={{
                headerTitle: () => <Text style={[styles.headerTitle, { fontWeight: 'bold' }]}>Connections</Text>,
                headerTitleAlign: 'center',
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('CreateSocialCircle')}>
                        <Ionicons name="add-circle" size={25} color="black" style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                ),
            }} 
        />
        <Tab.Screen
            name="Profile" 
            component={ProfilePageScreen} 
            options={{
                headerTitle: () => <Text style={[styles.headerTitle, {fontWeight: 'bold' }]}>Profile</Text>,
                headerTitleAlign: 'center',
                headerLeft: null,
                headerRight: () => (
                    <View style={{ flexDirection: 'row', marginRight: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('AccountSettings')} style={{ marginRight: 10 }}>
                            <Ionicons name="settings" size={25} color="black" style={styles.navItem} />
                        </TouchableOpacity>
                    </View>
                ),
            }} 
        />
    </Tab.Navigator>
);

const MainStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="MainTabs"
            component={MainTab}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="CreatePost"
            component={CreatePostScreen}
            options={{
                headerShown: true,
                headerLeft: ({ onPress }) => (
                    <TouchableOpacity onPress={onPress}>
                        <Ionicons name="arrow-back" size={25} style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                ),
                headerTitle: 'Create Post',
            }}
        />
        <Stack.Screen
            name="SocialCircleScreen"
            component={SocialCircleScreen} 
            options={{
                headerTitle: 'SocialCircle', 
            }}
        />
        <Stack.Screen
            name="Message"
            component={MessageScreen}
            options={{
                headerTitle: 'Messages',
            }}
        />
        <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen
            name="Menu"
            component={MenuScreen}
            options={{
                headerTitle: 'Menu',
            }}
        />
        <Stack.Screen
            name="MeditationScreen"
            component={MeditationScreen}
            options={{ headerShown: true, title: 'Meditation' }}
        />
        <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
            options={{ headerShown: true, title: 'Notifications' }}
        />
        <Stack.Screen
            name="LiveStreamScreen"
            component={LiveStreamScreen}
            options={{ headerShown: true, title: 'Live Stream' }}
        />
        <Stack.Screen
            name="AccountSettings"
            component={AccountSettingsScreen}
            options={{
                headerTitle: 'Account Settings',
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="CreateSocialCircle"
            component={CreateSocialCircleScreen}
            options={{
                headerTitle: 'Create Social Circle',
                headerLeft: ({ onPress }) => (
                    <TouchableOpacity onPress={onPress}>
                        <Ionicons name="arrow-back" size={25} style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                ),
            }}
        />
    </Stack.Navigator>
);

const App = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen
                name="Auth"
                component={AuthStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Main"
                component={MainStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

const styles = StyleSheet.create({
    navItem: {
        padding: 10,
    },
    headerTitle: {
        fontFamily: 'cursive',
        fontSize: 20,
        marginLeft: 15,
    },
});

export default App;
