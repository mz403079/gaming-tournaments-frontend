import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    ActivityIndicator, StatusBar, FlatList
} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import Carousel from 'react-native-snap-carousel';
import {windowWidth} from '../utils/Dimensions'
import ListItem from '../components/ListItem'
import TournamentDetailsScreen from '../screens/TournamentDetailsScreen'
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
import CustomSwitch from "../components/CustomSwitch";
import {render} from "react-dom";
import {List} from "react-native-paper";

type TournamentProps = {
    name: string,
    currentNumberOfTeams: number,
    description: string,
    lan: boolean,
    maxNumberOfTeams: number,
    maxTeamSize: number,
    reward: string,
    rules: string,
    teams: [],
    tournamentEnd: string,
    tournamentId: number,
    tournamentStart: string;
}
const HomeScreen = () => {

    const [isLoading, setLoading] = useState(false);
    const [tournaments, setTournaments] = useState([]);
    const tournamentsURL = 'https://gen-gg.herokuapp.com/api/getTournaments';
    const [eventsTab, setEventsTab] = useState(1);
    const onSelectSwitch = (value) => {
        setEventsTab(value);
    }
    let getTournaments = () => {
        fetch(tournamentsURL)
            .then((response) => response.json())
            .then((json) => setTournaments(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }
    useEffect(() => {
        setLoading(true);
        getTournaments();
    }, []);

    const carouselRef = useRef<Carousel<any>>(null)
    const renderBanner = ({ item, index}: { item: TournamentProps, index: any}) => {
        return <BannerSlider
                             name={item.name}
                             currentNumberOfTeams={item.currentNumberOfTeams}
                             description={item.description}
                             lan={item.lan}
                             maxNumberOfTeams={item.maxNumberOfTeams}
                             maxTeamSize={item.maxTeamSize}
                             reward={item.reward}
                             rules={item.rules}
                             teams={item.teams}
                             tournamentEnd={item.tournamentEnd}
                             tournamentId={item.tournamentId}
                             tournamentStart={item.tournamentStart}/>
    }
    const renderList = ({item, index}: { item: TournamentProps, index: any }) => {
        console.log(item.name);
        return <ListItem name={item.name}
                             currentNumberOfTeams={item.currentNumberOfTeams}
                             description={item.description}
                             lan={item.lan}
                             maxNumberOfTeams={item.maxNumberOfTeams}
                             maxTeamSize={item.maxTeamSize}
                             reward={item.reward}
                             rules={item.rules}
                             teams={item.teams}
                             tournamentEnd={item.tournamentEnd}
                             tournamentId={item.tournamentId}
                             tournamentStart={item.tournamentStart}/>
    }

    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212'}}>
                <ActivityIndicator size={"large"}/>
            </View>
        );
    }
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#121212"}}>
            <StatusBar barStyle="light-content"/>
            <ScrollView style={{padding: 20}}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,
                }}>

                    <Text style={{fontSize: 20, fontFamily: 'Roboto_500Medium', color: '#fff'}}>Hello
                        Hasan</Text>
                    <ImageBackground
                        source={{
                            uri: 'https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec'
                        }}
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
                    justifyContent: 'space-between'
                }}>
                    <Text style={{fontSize: 18, fontFamily: 'Roboto_500Medium', color: '#fff'}}> Upcoming
                        Events</Text>
                    <TouchableOpacity onPress={() => {
                    }}>
                        <Text style={{color: '#03DAC5'}}>See all</Text>
                    </TouchableOpacity>
                </View>
                <Carousel
                    ref={(ref) => (carouselRef.current?.snapToNext)}
                    data={tournaments}
                    renderItem={renderBanner}
                    sliderWidth={windowWidth - 40}
                    itemWidth={300}
                    loop={true}
                />
                <View style={{marginVertical: 20}}>
                    <CustomSwitch
                        selectionMode={1}
                        option1={"Free Events"}
                        option2={"Paid Events"}
                        onSelectSwitch={onSelectSwitch}
                    />
                </View>
                {eventsTab == 1 &&
                <FlatList
                    renderItem={renderList}
                    data={tournaments}/>
                }
                {eventsTab == 2 && <Text style={{color: '#fff'}}>Paid Events</Text>}
            </ScrollView>
        </SafeAreaView>
    );
}
export default HomeScreen;