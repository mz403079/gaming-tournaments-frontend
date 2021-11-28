import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import RankingScreen from "./RankingScreen";
import ProfileScreen from "./ProfileScreen";
import MyTicketsScreen from "./MyTicketsScreen";
const HomeStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const MainTabScreen = () => (
    <Tab.Navigator
        initialRouteName="Feed"
        activeColor="#03DAC5"
        barStyle={{ backgroundColor: '#303030' }}

        >
        <Tab.Screen
            name="HomeTab"
            component={HomeStackScreen}
            options={{

                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-home" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="RankingTab"
            component={RankingStackScreen}
            options={{
                tabBarLabel: 'Ranking',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="podium" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="MapTab"
            component={MapScreen}
            options={{
                tabBarLabel: 'Map',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="map-marker" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="MyTicketsTab"
            component={MyTicketsStackScreen}
            options={{
                tabBarLabel: 'My tickets',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="ticket-confirmation-outline" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="ProfileTab"
            component={ProfileStackScreen}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />
                ),
            }}
        />
    </Tab.Navigator>
);

const HomeStackScreen = ({navigation}: {navigation: any}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
            title:'',
            // headerLeft: () => (
            //     <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}/>
            // )
            headerShown:false
        }} />
    </HomeStack.Navigator>
);

const RankingStackScreen = ({navigation}: {navigation: any}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Ranking" component={RankingScreen} options={{
            title:'Ranking',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}/>
            )
        }} />
    </HomeStack.Navigator>
);

// const MapStackScreen = ({navigation}: {navigation: any}) => (
//     <HomeStack.Navigator screenOptions={{
//         headerStyle: {
//             backgroundColor: '#009387',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//             fontWeight: 'bold'
//         }
//     }}>
//         <HomeStack.Screen name="Map" component={MapScreen} options={{
//             title:'',
//             headerShown:false
//         }} />
//     </HomeStack.Navigator>
// );

const MyTicketsStackScreen = ({navigation}: {navigation: any}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="My Tickets" component={MyTicketsScreen} options={{
            title:'MyTickets',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}/>
            )
        }} />
    </HomeStack.Navigator>
);

const ProfileStackScreen = ({navigation}: {navigation: any}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Profile" component={ProfileScreen} options={{
            title:'Profile',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}/>
            )
        }} />
    </HomeStack.Navigator>
);

export default MainTabScreen;