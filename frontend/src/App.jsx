import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomepageScreen from './screens/HomepageScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SearchScreen from './screens/SearchScreen';
import ProfilePageScreen from './screens/ProfilePageScreen';
import ProtectedRoute from './components/ProtectedRoute';
import CreatePostScreen from './screens/CreatePostScreen';
import ConnectionScreen from './screens/ConnectionScreen';
import MessageScreen from './screens/MessageScreen';  // Add this import
import MenuScreen from './screens/MenuScreen';  // Add this import
import AccountSettingsScreen from './screens/AccountSettingsScreen';  // Add this import

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
            component={ForgotPasswordScreen} // Adding ForgotPasswordScreen
            options={{ headerShown: false }} // Hide the header for the forgot password screen
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
                headerTitle: () => <Text style={[styles.headerTitle, {fontWeight: 'bold' }]}>Home</Text>, // Custom header title
                headerTitleAlign: 'left', // Align title to the left
                headerLeft: null, // No left-aligned icon
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
            component={EmptyScreen} // Using a named component instead of an inline function
            options={{
                tabBarButton: (props) => <CreatePostButton {...props} navigation={navigation} />
            }}
        />
        <Tab.Screen name="Connection" component={ConnectionScreen} />
        <Tab.Screen
            name="Profile" 
            component={ProfilePageScreen} 
            options={{
                headerTitle: () => <Text style={[styles.headerTitle, {fontWeight: 'bold' }]}>Profile</Text>, // Custom header title
                headerTitleAlign: 'center', // Align title to the left
                headerLeft: null, // No left-aligned icon
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
                headerShown: true, // Show the header for CreatePostScreen
                headerLeft: ({ onPress }) => (
                    <TouchableOpacity onPress={onPress}>
                        <Ionicons name="arrow-back" size={25} style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                ),
                headerTitle: 'Create Post', // Title for CreatePostScreen
            }}
        />
        <Stack.Screen
            name="Message"
            component={MessageScreen} // Add the Message screen
            options={{
                headerTitle: 'Messages', // Title for MessageScreen
            }}
        />
        <Stack.Screen
            name="Menu"
            component={MenuScreen} // Add the Menu screen
            options={{
                headerTitle: 'Menu', // Title for MenuScreen
            }}
        />
        <Stack.Screen
            name="AccountSettings"
            component={AccountSettingsScreen} // Add the Account Settings screen
            options={{
                headerTitle: 'Account Settings', // Title for AccountSettingsScreen
                headerShown: false ,
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
        fontFamily: 'cursive', // Cursive font style
        fontSize: 20, // Adjust the font size as needed
        marginLeft: 15, // Adjust the margin to align with the left side
    },
});

export default App;
