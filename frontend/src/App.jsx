import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import HomepageScreen from './screens/HomepageScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SearchScreen from './screens/SearchScreen';
import ProfilePageScreen from './screens/ProfilePageScreen';
import ProtectedRoute from './components/ProtectedRoute';
import CheckpointsScreen from './screens/CheckpointsScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import AccountSettingsScreen from './screens/AccountSettingsScreen';

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

const CreatePostButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={{
                width: 60,
                height: 60,
                backgroundColor: '#000',
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
            }}
            onPress={() => navigation.navigate('CreatePost')}
        >
            <Icon name="add" size={35} color="white" />
        </TouchableOpacity>
    );
};

const MainTab = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = 'home';
                } else if (route.name === 'Profile') {
                    iconName = 'person';
                } else if (route.name === 'CreatePostButton') {
                    return <CreatePostButton />;
                }

                return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarShowLabel: false, // Hide the labels under icons
        })}
    >
        <Tab.Screen name="Home" component={HomepageScreen} />
        <Tab.Screen
            name="CreatePostButton"
            component={() => null} // Dummy component to handle the icon only
        />
        <Tab.Screen
            name="Profile"
            component={ProfilePageScreen}
            options={{
                tabBarLabel: 'Profile',
            }}
        />
        <Tab.Screen name="Account Settings" component={AccountSettingsScreen} />
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
                        <Icon name="arrow-back" size={25} style={{ marginLeft: 15, }} />
                    </TouchableOpacity>
                ),
                headerTitle: 'Create Post', // Title for CreatePostScreen
            }}
        />
    </Stack.Navigator>
);

const App = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
                name="Main"
                component={MainStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Auth"
                component={AuthStack}
                options={{ headerShown: false }}
            />
            
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;
