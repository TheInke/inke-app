
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import LoginScreen from './screens/LoginScreen';
// import AuthStatusScreen from './screens/AuthStatusScreen';
// import EditProfileScreen from './screens/EditProfileScreen';
// import ProtectedRoute from './components/ProtectedRoute';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// const AuthStack = () => (
//     <Stack.Navigator>
//         <Stack.Screen name="LoginScreen" component={LoginScreen} />
//     </Stack.Navigator>
// );

// const MainTab = () => (
//     <Tab.Navigator>
//         <Tab.Screen name="AuthStatusScreen" component={AuthStatusScreen} />
//         <Tab.Screen
//             name="EditProfileScreen"
//             component={EditProfileScreenWrapper}
//             options={{
//                 tabBarLabel: 'Edit Profile',
//             }}
//         />
//     </Tab.Navigator>
// );

// const EditProfileScreenWrapper = () => (
//     <ProtectedRoute>
//         <EditProfileScreen />
//     </ProtectedRoute>
// );

// const App = () => (
//     <NavigationContainer>
//         <Stack.Navigator initialRouteName="Auth">
//             <Stack.Screen
//                 name="Auth"
//                 component={AuthStack}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="Main"
//                 component={MainTab}
//                 options={{ headerShown: false }}
//             />
//         </Stack.Navigator>
//     </NavigationContainer>
// );

// export default App;








// testing code for create post screen as I was not able to login with superuser i.e the screens were not switching {authrntication issues}
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomepageScreen from './screens/HomepageScreen';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from './screens/LoginScreen';
import AuthStatusScreen from './screens/AuthStatusScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ProfilePageScreen from './screens/ProfilePageScreen';
import ProtectedRoute from './components/ProtectedRoute';
import ExploreScreen from './screens/ExploreScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => (
    <Tab.Navigator initialRouteName="HomepageScreen">
        <Tab.Screen name="HomepageScreen" component={HomepageScreen} />
        <Tab.Screen name="ExploreScreen" component={ExploreScreen} />
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
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
                name="Main"
                component={MainTab}
                options={{ headerShown: false }}
        <Stack.Navigator initialRouteName="ProfilePageScreen">
            <Stack.Screen
                name="ProfilePageScreen"
                component={ProfilePageScreen}
                options={({ navigation }) => ({
                    headerShown: true,
                    title: 'Upload',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="chevron-back" size={30} style={{ marginLeft: 25 }} />
                        </TouchableOpacity>
                    ),
                })}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;