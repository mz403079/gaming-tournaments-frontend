import React, {useState, useEffect} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Dimensions,
    Platform,
    TouchableOpacity, Animated,
} from 'react-native';
import styled from 'styled-components/native'
import {LinearGradient} from "expo-linear-gradient";
const { width, height } = Dimensions.get('window');
import { COLORS, SIZES, FONTS } from '../constants';
import moment from "moment";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import {Line} from "react-native-svg";
import {mapDarkStyle} from "../model/mapData";

interface Tournament {
    name: string
    tournamentStart: string
    description?: string
    tournamentEnd: string
    maxTeamSize: number
    maxNumberOfTeams: number
    currentNumberOfTeams: number
    reward: number
    winner: string
    isLan: boolean
    city: string
    street: string
    regulations: string
    organizer: any
    lat: number
    lng: number
  }
const EventDetail = ({ navigation, route }) => {

    const [selectedEvent, setSelectedEvent] = useState<Tournament>();

    useEffect(() => {
        let {selectedEvent} = route.params;
        setSelectedEvent(selectedEvent)
        navigation.setOptions({tabBarVisible: false})
    }, [])

    const Region = {
        latitude: selectedEvent?.lat,
        longitude: selectedEvent?.lng,
        latitudeDelta: 0.007,
        longitudeDelta: 0.007 * (SIZES.width / SIZES.height),
    }


    return (
        <View style={styles.container}>
            <ScrollView
            contentContainerStyle={{
                backgroundColor: "black"
            }}
            style={{
                backgroundColor: "black"
            }}>
                <ImageBackground
                    source={{uri: 'https://i.pinimg.com/originals/33/4a/8f/334a8fa7a0470252bbc11be4771a6f61.jpg'}}
                    resizeMode='cover'
                    style={{
                        width: width,
                        height: height < 700 ? height* 0.4 : height * 0.5
                    }}>
                    <View style={{flex: 1}}>
                        <SectionImageHeader>
                        </SectionImageHeader>
                        <SectionImageFooter>
                            <LinearGradient
                                colors={['transparent', '#000']}
                                start={{x: 0, y: 0}}
                                end={{x: 0, y: 1}}
                                style={{
                                    width: '100%',
                                    height: 400,
                                    justifyContent: 'flex-end'
                            }}
                            >
                            <FooterContentView>
                                <View>
                                    {/*<McText >{selectedEvent?.type}</McText>*/}
                                    <McText h1>{selectedEvent?.name}</McText>
                                    <McText body4 style={{opacity: 0.5, letterSpacing: 1.5}}>
                                        STARTING {moment(selectedEvent?.tournamentStart).format('hh:mm A')}</McText>
                                </View>
                                <LinearGradient colors={['#E4FFF9', '#E4FFF9']}
                                                start={{x: 0, y: 1}}
                                                end={{x: 1, y: 1}}
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    borderRadius: 15,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                    <McText body4 style={{letterSpacing: 1, color: '#03DAC5', fontFamily: "Roboto_700Bold"}}>{moment(selectedEvent?.tournamentStart)
                                        .format('MMM')
                                        .toUpperCase()}</McText>
                                    <McText h2 style={{color: '#121212', fontFamily: "Roboto_500Medium"}}>{moment(selectedEvent?.tournamentStart)
                                        .format('DD')}</McText>
                                </LinearGradient>
                            </FooterContentView>
                            </LinearGradient>
                        </SectionImageFooter>
                    </View>
                </ImageBackground>
                <ButtonSection>
                    <TouchableOpacity
                        style={{
                            width: 93,
                            height: 32,
                            marginRight: 16,
                            borderRadius: 10,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <McText h6 style={{color: 'black'}}>ABOUT</McText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: 100,
                            height: 32,
                            borderRadius: 10,
                            backgroundColor: COLORS.input,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <McText h6 style={{opacity:0.5, letterSpacing: 1}}>RULES</McText>
                    </TouchableOpacity>
                </ButtonSection>
                <DescriptionSection>
                <McText body3>
                    { "Tournament Organizer: " + selectedEvent?.organizer.name + " " + selectedEvent?.organizer.surname } 
                        
                    </McText>
                    <View
  style={{
    borderBottomColor: 'white',
    marginTop: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
  }}
/>
                    <McText body3>
                        {selectedEvent?.winner ? (
                            "Tournament winner: " +selectedEvent?.winner
                            )
                             : (selectedEvent?.description ? selectedEvent?.description : 
                                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley") }
                        
                    </McText>
                </DescriptionSection>
                <LocationSection>
                    <McText h3>LOCATION</McText>
                    <View
                        style={{
                        height: 250
                    }}>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={{
                                height: 250,
                                borderRadius: 30,
                                marginTop: 20
                            }}
                            minZoomLevel={15}
                            initialRegion={Region}
                            customMapStyle={mapDarkStyle}
                            pointerEvents="none">
                            <Marker
                                coordinate={{latitude: selectedEvent?.lat, longitude: selectedEvent?.lng}}
                            >
                                <Animated.View style={[styles.markerWrap]}>
                                    <Animated.Image
                                        source={require('../assets/images/marker.png')}
                                        style={[styles.marker]}
                                        resizeMode="cover"
                                    />
                                </Animated.View>
                            </Marker>
                        </MapView>
                    </View>
                    <View style={{paddingBottom: 150}}/>
                </LocationSection>
            </ScrollView>
            <BottomBarSection>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 30
                }}>
                    <View>
                        <McText style={{opacity: 0.5, letterSpacing: 1, fontFamily: 'Roboto_500Medium'}}>Teams</McText>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end'}}>
                            <McText h2 style={{color: '#03DAC5', fontFamily: 'Roboto_500Medium'}}>{selectedEvent?.currentNumberOfTeams}</McText>
                            <McText h3> /{selectedEvent?.maxNumberOfTeams}</McText>
                        </View>
                    </View>
                        <TouchableOpacity
                            disabled={selectedEvent?.winner !== null}
                            onPress={()=>{navigation.navigate('RegistrationForTournaments', {selectedEvent})}}>
                            <LinearGradient
                                colors={['#03DAC5', '#03DAC5']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1}}
                                style={{
                                    width: 173,
                                    height: 53,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 15
                                }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <McText h3>Sign Up</McText>

                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                </View>
            </BottomBarSection>
        </View>
    );
};

const SectionImageHeader = styled.View`
  flex: 1;
  justify-content: space-between;
  margin-top: ${Platform.OS === 'ios' ? '40px' : '20px'}
  margin-left: 30px;
  margin-right: 30px;
`;

const DescriptionSection = styled.View`
  margin: 0px 30px;
  
`;

const LocationSection = styled.View`
  margin: 25px 30px;
  
`;

const SectionImageFooter = styled.View`
    flex: 1;
    justify-content: flex-end;
    position: relative;
    z-index: -1;
`;

const FooterContentView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0px 30px
`;

const ButtonSection = styled.View`
    margin: 15px 30px;
    flex-direction: row;
`;

const BottomBarSection = styled.View`
    height: 130px;
    width: ${SIZES.width+'px'};
    border-radius: ${SIZES.radius};
    background-color: ${COLORS.tabBar};
    position: absolute;
    bottom: 0px;
    justify-content: center;
`;

const McText = styled.Text`
  color: ${(props) => (props.color ? props.color : COLORS.default)};

  ${({ h1, h2, h3, h4, h5, h6 }) => {
    switch (true) {
        case h1: { return FONTS.h1; }
        case h2: { return FONTS.h2; }
        case h3: { return FONTS.h3; }
        case h4: { return FONTS.h4; }
        case h5: { return FONTS.h5; }
        case h6: { return FONTS.h6; }
    }
}}
  ${({ body1, body2, body3, body4, body5, body6 }) => {
    switch (true) {
        case body1: { return FONTS.body1; }
        case body2: { return FONTS.body2; }
        case body3: { return FONTS.body3; }
        case body4: { return FONTS.body4; }
        case body5: { return FONTS.body5; }
        case body6: { return FONTS.body6; }
    }
}}
`;

export const Region = {
    latitude: 37.58817,
    longitude: -122.4903973,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005 * (SIZES.width / SIZES.height),
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: 40,
        height: 40,
    },
});

export default EventDetail;
