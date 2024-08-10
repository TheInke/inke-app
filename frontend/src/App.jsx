import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomepageScreen from './screens/HomepageScreen';
import AuthStatusScreen from './screens/AuthStatusScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ProtectedRoute from './components/ProtectedRoute';
import CheckpointsScreen from './screens/CheckpointsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => (
    <Tab.Navigator initialRouteName="HomepageScreen">
        <Tab.Screen name="HomepageScreen" component={HomepageScreen} />
        <Tab.Screen name="AuthStatusScreen" component={AuthStatusScreen} />
        <Tab.Screen name="Checkpoints" component={CheckpointsScreen} />
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
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
                name="Main"
                component={MainTab}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;


