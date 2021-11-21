import React from 'react';
import useCachedResources from "../hooks/useCachedResources";
import useColorScheme from "../hooks/useColorScheme";
import {
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold, Roboto_700Bold_Italic, Roboto_900Black, Roboto_900Black_Italic,
    useFonts
} from "@expo-google-fonts/roboto";
import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../assets/colors/colors";
import GamingIcon from "../assets/images/Gaming.svg";
import {MaterialIcons} from "@expo/vector-icons";
import SignIn from "./SignInScreen";

const MainScreen = ({navigation}: {navigation: any}) => {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    let [fontsLoaded] = useFonts({
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
    });
    if (!isLoadingComplete || !fontsLoaded) {
        return null;
    } else {
        return (
            <SafeAreaView style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.background
            }}>
                <View style={{marginTop: 30}}>
                    <Text style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: '#fff',
                        fontFamily: 'Roboto_700Bold'
                    }}>GAME TOURNAMENTS</Text>
                </View>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <GamingIcon width={300} height={300} style={{transform: [{rotate: '-15deg'}]}}/>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignIn')}
                    style={{
                        backgroundColor: colors.primary,
                        padding: 20,
                        width: '70%',
                        borderRadius: 30,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 50
                    }}>
                    <Text style={{
                        fontWeight: 'bold',
                        color: colors.background,
                        fontSize: 18,
                        fontFamily: 'Roboto_500Medium',
                        marginLeft: '7%'
                    }}>Start</Text>
                    <MaterialIcons name='arrow-forward-ios' size={22} color='colors.background'/>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

export default MainScreen;