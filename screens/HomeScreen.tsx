import {Text, View, SafeAreaView, ScrollView, ImageBackground, TextInput, TouchableOpacity} from "react-native";
import React from "react";
import Carousel from 'react-native-snap-carousel';
import {windowWidth} from '../utils/Dimensions'
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
import {Feather} from "@expo/vector-icons";
import {sliderData} from "../model/data";
import BannerSlider from "../components/BannerSlider";

const HomeScreen = () => {
    // @ts-ignore
    const renderBanner = ({item, index}) => {
        return <BannerSlider data={item}/>
    }
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#121212"}}>
            <ScrollView style={{padding: 20}}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,
                }}>

                    <Text style={{fontSize: 16, fontFamily: 'Roboto_500Medium', color: '#fff'}}>Hello Amogus</Text>
                    <ImageBackground
                        source={{uri: 'https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec'}}
                        style={{width: 35, height: 35}}
                        imageStyle={{borderRadius: 25}}
                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    borderColor: '#C6C6C6',
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                }}>
                    <Feather name="search" size={20} color="#C6C6C6" style={{marginRight: 5}}/>
                    <TextInput placeholder="Search"/>
                </View>
                <View style={{
                    marginVertical: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 18, fontFamily: 'Roboto_500Medium', color: '#fff'}}> Upcoming Events</Text>
                    <TouchableOpacity onPress={() => {
                    }}>
                        <Text style={{color: '#03DAC5'}}>See all</Text>
                    </TouchableOpacity>
                </View>
                <Carousel
                    ref={(c) => { // @ts-ignore
                        this._carousel = c; }}
                    data={sliderData}
                    renderItem={renderBanner}
                    sliderWidth={windowWidth - 40}
                    itemWidth={300}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;