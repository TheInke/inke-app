/*
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomepageScreen from './screens/HomepageScreen';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from './screens/LoginScreen';
import SearchScreen from './screens/SearchScreen';
import AuthStatusScreen from './screens/AuthStatusScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ProfilePageScreen from './screens/ProfilePageScreen';
import ProtectedRoute from './components/ProtectedRoute';
import CheckpointsScreen from './screens/CheckpointsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
);

const MainTab = () => (
    <Tab.Navigator initialRouteName="HomepageScreen">
        <Tab.Screen name="HomepageScreen" component={HomepageScreen} />
        <Tab.Screen name="ExploreScreen" component={ExploreScreen} />
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
*/



/*
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import AuthStatusScreen from './screens/AuthStatusScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';


const Stack = createStackNavigator();

const App = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="SearchScreen">
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{ headerShown: true, title: 'Search' }}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;
*/








/*import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AuthStatusScreen from './screens/AuthStatusScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const App = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="SearchScreen"
            screenOptions={({ navigation }) => ({
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 10 }}>
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </TouchableOpacity>
                ),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontWeight: 'bold' },
            })}
        >
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{ title: 'Search' }}
            />
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ title: 'Home' }}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ title: 'Login' }}
            />
            <Stack.Screen
                name="AuthStatusScreen"
                component={AuthStatusScreen}
                options={{ title: 'Auth Status' }}
            />
            <Stack.Screen
                name="EditProfileScreen"
                component={EditProfileScreen}
                options={{ title: 'Edit Profile' }}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;
*/






import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AuthStatusScreen from './screens/AuthStatusScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import SearchScreen from './screens/SearchScreen';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const App = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="HomeScreen" // Set HomeScreen as the initial route
            screenOptions={({ navigation, route }) => ({
                headerLeft: () => (
                    (route.name !== 'HomeScreen') && (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 10 }}>
                            <Ionicons name="chevron-back" size={24} color="black" />
                        </TouchableOpacity>
                    )
                ),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontWeight: 'bold' },
            })}
        >
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ title: 'Home' }}
            />
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{ title: 'Search' }}
                initialParams={{ fromHome: true }} // Pass a parameter to indicate it's coming from the Home screen
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ title: 'Login' }}
            />
            <Stack.Screen
                name="AuthStatusScreen"
                component={AuthStatusScreen}
                options={{ title: 'Auth Status' }}
            />
            <Stack.Screen
                name="EditProfileScreen"
                component={EditProfileScreen}
                options={{ title: 'Edit Profile' }}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;