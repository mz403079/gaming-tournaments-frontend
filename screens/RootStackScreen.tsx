import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './MainScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "./MapScreen";
import MyTicketsScreen from "./MyTicketsScreen";
import ProfileScreen from "./ProfileScreen";

const RootStack = createStackNavigator();

const RootStackScreen = () => (
    <RootStack.Navigator>
        <RootStack.Screen name="Main" component={MainScreen} options={{headerShown:false}}/>
        <RootStack.Screen name="SignIn" component={SignInScreen} options={{headerShown:false}}/>
        <RootStack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}}/>
        <RootStack.Screen name="Home" component={HomeScreen}/>
        <RootStack.Screen component={MapScreen} name="Map" options={{headerShown: false}}/>
        <RootStack.Screen component={MyTicketsScreen} name="MyTickets" options={{headerShown: false}}/>
        <RootStack.Screen component={ProfileScreen} name="Profile" options={{headerShown: false}}/>
    </RootStack.Navigator>
);

export default RootStackScreen;