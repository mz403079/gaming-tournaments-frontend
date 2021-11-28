import React, {useEffect} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import MainScreen from "./screens/MainScreen";
import HomeScreen from "./screens/HomeScreen";
import RootStackScreen from "./screens/RootStackScreen";
import {AuthContext} from "./components/context";
import MainTabScreen from "./screens/MainTabScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    useFonts,
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';
import GamingIcon from './assets/images/Gaming.svg'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {DrawerContent} from "./screens/DrawerContent";
import MapScreen from "./screens/MapScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MyTicketsScreen from "./screens/MyTicketsScreen";
const Drawer = createDrawerNavigator();
const App = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState<any>(null);

    const authContext = React.useMemo(() => ({
        signIn: () => {
            setUserToken('xyz');
            setIsLoading(false);
        },
        signOut: () => {
            setUserToken(null);
            setIsLoading(false);
            AsyncStorage.removeItem("user");
        },
        signUp: () => {
            setUserToken('xyz');
            setIsLoading(false);
        }
    }), []);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);
    if(isLoading){
        return (
            <View style = {{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#121212'}}>
                <ActivityIndicator size={"large"}/>
            </View>
        );
    }
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                { userToken != null ? (
                <Drawer.Navigator drawerContent={props => <DrawerContent {...{props}} />}>
                    <Drawer.Screen component={MainTabScreen} name="Home" options={{headerShown: false}}/>
                    <Drawer.Screen component={MainScreen} name="Main" options={{headerShown:false}}/>
                    <Drawer.Screen component={SignInScreen} name="SignIn" options={{headerShown: false}}/>
                    <Drawer.Screen component={SignUpScreen} name="SignUp" options={{headerShown: false}}/>
                    <Drawer.Screen component={MapScreen} name="Map" options={{headerShown: false}}/>
                    <Drawer.Screen component={MyTicketsScreen} name="MyTickets" options={{headerShown: false}}/>
                    <Drawer.Screen component={ProfileScreen} name="Profile" options={{headerShown: false}}/>
                </Drawer.Navigator>
                )
                :
                <RootStackScreen/>}
            </NavigationContainer>
        </AuthContext.Provider>
    )
}

export default App;

