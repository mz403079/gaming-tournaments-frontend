import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import TournamentDetailsScreen from "./TournamentDetailsScreen";
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RankingScreen from "./RankingScreen";
import ProfileScreen from "./ProfileScreen";
import MyTicketsScreen from "./MyTicketsScreen";
import EditProfileScreen from "./EditProfileScreen";
import GameAccountsScreen from "./GameAccountsScreen";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import RegistrationForTournamentScreen from "./RegistrationForTournamentScreen";
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const TopStack = createStackNavigator();
const MainTabScreen = () => (

    <Tab.Navigator
        initialRouteName="Feed"
        activeColor="#03DAC5"
        barStyle={{backgroundColor: '#303030'}}

    >
        <Tab.Screen
            name="HomeTab"
            component={HomeStackScreen}
            options={({ route }) => ({
                tabBarStyle: {display: 'none'},
                tabBarLabel: 'Home',
                tabBarIcon: ({color}) => (
                    <Icon name="ios-home" color={color} size={26}/>
                ),
            })}
        />
        <Tab.Screen
            name="RankingTab"
            component={RankingStackScreen}
            options={{
                tabBarLabel: 'Ranking',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="podium" color={color} size={26}/>
                ),
            }}
        />
        <Tab.Screen
            name="MapTab"
            component={MapScreen}
            options={{
                tabBarLabel: 'Map',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="map-marker" color={color} size={26}/>
                ),
            }}
        />
        <Tab.Screen
            name="MyTicketsTab"
            component={MyTicketsStackScreen}
            options={{
                tabBarLabel: 'My tickets',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="ticket-confirmation-outline" color={color} size={26}/>
                ),
            }}
        />
        <Tab.Screen
            name="ProfileTab"
            component={ProfileStackScreen}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="account" color={color} size={26}/>
                ),
            }}
        />
    </Tab.Navigator>
);

const HomeStackScreen = ({navigation}: { navigation: any }) => (
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
            title: '',
            // headerLeft: () => (
            //     <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}/>
            // )
            headerShown: false
        }}/>
        <HomeStack.Screen
            name="TournamentDetails"
            component={TournamentDetailsScreen}
            options={{
                headerShown: false,
            }}
        />
        <HomeStack.Screen
            name="RegistrationForTournaments"
            component={RegistrationForTournamentScreen}
            options={{
                headerShown: false,
            }}/>
    </HomeStack.Navigator>
);

const RankingStackScreen = ({navigation}: { navigation: any }) => (
    <ProfileStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#121212',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <ProfileStack.Screen name="Ranking" component={RankingScreen} options={{
            title: '',
            headerShown: false,
        }}/>
    </ProfileStack.Navigator>
);

const MyTicketsStackScreen = ({navigation}: { navigation: any }) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#121212',
            shadowColor: '#121212', //ios
            elevation: 0 //android
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="My Tickets" component={MyTicketsScreen} options={{
            title: 'MyTickets',
            headerLeft: () => (
                <Icon.Button
                    name="ios-menu"
                    size={25}
                    backgroundColor="#121212"
                    onPress={() => navigation.openDrawer()}/>
            ),
        }}/>
    </HomeStack.Navigator>
);

const ProfileStackScreen = ({navigation}: { navigation: any }) => (
    <ProfileStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#121212',
            shadowColor: '#121212', //ios
            elevation: 0 //android
        },
        headerTintColor: '#fff',
    }}>
        <ProfileStack.Screen
            name="Profile"
            component={ProfileScreen} options={{
            title: '',
            headerLeft: () => (
                <Icon.Button
                    name="ios-menu"
                    size={25}
                    backgroundColor="#121212"
                    onPress={() => navigation.openDrawer()}/>
            ),
            headerRight: () => (
                <MaterialCommunityIcons.Button
                    name="square-edit-outline"
                    size={25}
                    backgroundColor="#121212"
                    onPress={() => navigation.navigate('EditProfile')}/>
            )
        }}
        />
        <ProfileStack.Screen
            name="EditProfile"
            options={{
                title: "Edit Profile"
            }}
            component={EditProfileScreen}
        />
        <ProfileStack.Screen
            name="GameAccounts"
            options={{
                title: "Game Accounts"
            }}
            component={GameAccountsScreen}
        />
    </ProfileStack.Navigator>
);

export default MainTabScreen;