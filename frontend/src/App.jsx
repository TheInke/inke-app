import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import AuthStatusScreen from './screens/AuthStatusScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ProtectedRoute from './components/ProtectedRoute';
import PrivacyAndSecurityScreen from './PrivacySecurityScreen'; // Stack in Account Settings
import AboutScreen from './AboutScreen'; //Stack in an Account Settings stack navigator

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
);

const MainTab = () => (
    <Tab.Navigator>
        <Tab.Screen name="AuthStatusScreen" component={AuthStatusScreen} />
        <Tab.Screen
            name="EditProfileScreen"
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

// Account Settings Stack
const AccountSettingsStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="PrivacyAndSecurity"
            component={PrivacyAndSecurityScreen}
            options={{ title: 'Privacy & Security' }}
        />
        <Stack.Screen
            name="About"
            component={AboutScreen}
            options={{ title: 'About' }}
        />
    </Stack.Navigator>
);

export default App;
