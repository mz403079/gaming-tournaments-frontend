import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './MainScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
const RootStack = createStackNavigator();

const RootStackScreen = () => (
    <RootStack.Navigator defaultScreenOptions={{headerShown: false}}>
        <RootStack.Screen component={MainScreen}        name="Main"             options={{headerShown: false}}/>
        <RootStack.Screen component={SignInScreen}      name="SignIn"           options={{headerShown: false}}/>
        <RootStack.Screen component={SignUpScreen}      name="SignUp"           options={{headerShown: false}}/>
    </RootStack.Navigator>
);

export default RootStackScreen;