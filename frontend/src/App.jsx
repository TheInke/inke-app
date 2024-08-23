import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomepageScreen from './screens/HomepageScreen';
import AuthStatusScreen from './screens/AuthStatusScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ProtectedRoute from './components/ProtectedRoute';
import ExploreScreen from './screens/ExploreScreen';
import SearchScreen from './screens/SearchScreen';

const Stack = createStackNavigator();

const EditProfileScreenWrapper = () => (
    <ProtectedRoute>
        <EditProfileScreen />
    </ProtectedRoute>
);

const App = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="HomepageScreen">
            <Stack.Screen
                name="HomepageScreen"
                component={HomepageScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ExploreScreen"
                component={ExploreScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AuthStatusScreen"
                component={AuthStatusScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditProfileScreen"
                component={EditProfileScreenWrapper}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;