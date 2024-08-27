/*
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './components/LoginPage/LoginScreen';
import ForgotPasswordScreen from './components/LoginPage/SignupScreen';
import AuthStatusScreen from './components/LoginPage/AuthStatusScreen';
import EditProfileScreen from './components/LoginPage/EditProfileScreen';
import ProtectedRoute from './components/LoginPage/ProtectedRoute';
import SignupScreen from './components/LoginPage/SignupScreen';

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
            options={{ headerShown: false }} // Hide the header for the forgot password screen
        />
    </Stack.Navigator>
);

const MainTab = () => (
    <Tab.Navigator>
        <Tab.Screen name="AuthStatus" component={AuthStatusScreen} />
        <Tab.Screen
            name="EditProfile"
            component={EditProfileScreenWrapper}
            options={{
                tabBarLabel: 'Edit Profile',
            }}
        />
    </Tab.Navigator>
);

const EditProfileScreenWrapper = () => (
    <ProtectedRoute>
        <EditProfileScreen />
    </ProtectedRoute>
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
                component={MainTab}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;
*/



import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './components/LoginPage/LoginScreen';
//import ForgotPasswordScreen from './components/LoginPage/ForgotPasswordScreen';
import AuthStatusScreen from './components/LoginPage/AuthStatusScreen';
import EditProfileScreen from './components/LoginPage/EditProfileScreen';
import ProtectedRoute from './components/LoginPage/ProtectedRoute';
import SignupScreen from './components/LoginPage/SignupScreen';

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
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }} // Hide the header for the signup screen
        />
    </Stack.Navigator>
);

const MainTab = () => (
    <Tab.Navigator>
        <Tab.Screen name="AuthStatus" component={AuthStatusScreen} />
        <Tab.Screen
            name="EditProfile"
            component={EditProfileScreenWrapper}
            options={{
                tabBarLabel: 'Edit Profile',
            }}
        />
    </Tab.Navigator>
);

const EditProfileScreenWrapper = () => (
    <ProtectedRoute>
        <EditProfileScreen />
    </ProtectedRoute>
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
                component={MainTab}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;
