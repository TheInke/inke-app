/*
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
//import LoginScreen from './screens/LoginScreen';
import AuthStatusScreen from './screens/AuthStatusScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ProtectedRoute from './components/ProtectedRoute';

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

export default App;
*/

/*
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
//import HomepageScreen from './screens/HomepageScreen';
import AuthStatusScreen from './screens/AuthStatusScreen';
//import EditProfileScreen from './screens/EditProfileScreen';
import ProtectedRoute from './components/ProtectedRoute';
import SearchScreen from './screens/SearchScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => (
    <Tab.Navigator initialRouteName="HomepageScreen">
        <Tab.Screen name="SearchScreen" component={SearchScreen} />
        <Tab.Screen name="AuthStatusScreen" component={AuthStatusScreen} />
        <Tab.Screen
            name="SearchScreen"
            component={SearchScreenWrapper}
            options={{
                tabBarLabel: 'Search',
            }}
        />
    </Tab.Navigator>
);

const SearchScreenWrapper = () => (
    <ProtectedRoute>
        <SearchScreen />
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
*/


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './screens/SearchScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SearchScreen">
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;











