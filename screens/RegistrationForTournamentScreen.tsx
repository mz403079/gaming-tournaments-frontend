import React, {useState, useEffect} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Dimensions,
    Platform,
    TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native'
import {LinearGradient} from "expo-linear-gradient";
const { width, height } = Dimensions.get('window');
import { COLORS, SIZES, FONTS } from '../constants';
import moment from "moment";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import {Line} from "react-native-svg";
import {mapDarkStyle} from "../model/mapData";
import * as Animatable from "react-native-animatable";
import {InputField} from "../components/UI";
import {FontAwesome} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
const EventDetail = ({ navigation, route }) => {

    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        let {selectedEvent} = route.params;
        setSelectedEvent(selectedEvent)
        navigation.setOptions({tabBarVisible: false})
    }, [])


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
                        height: height < 700 ? height* 0.2 : height * 0.28
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
                {/*<ButtonSection>*/}
                {/*    <TouchableOpacity*/}
                {/*        style={{*/}
                {/*            width: 93,*/}
                {/*            height: 32,*/}
                {/*            marginRight: 16,*/}
                {/*            borderRadius: 10,*/}
                {/*            backgroundColor: 'white',*/}
                {/*            justifyContent: 'center',*/}
                {/*            alignItems: 'center'*/}
                {/*        }}>*/}
                {/*            <McText h6 style={{color: 'black'}}>ABOUT</McText>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <TouchableOpacity*/}
                {/*        style={{*/}
                {/*            width: 100,*/}
                {/*            height: 32,*/}
                {/*            borderRadius: 10,*/}
                {/*            backgroundColor: COLORS.input,*/}
                {/*            justifyContent: 'center',*/}
                {/*            alignItems: 'center'*/}
                {/*        }}>*/}
                {/*        <McText h6 style={{opacity:0.5, letterSpacing: 1}}>RULES</McText>*/}
                {/*    </TouchableOpacity>*/}
                {/*</ButtonSection>*/}
                <DescriptionSection>

                </DescriptionSection>
                {/*<LocationSection>*/}
                {/*    <McText h3>LOCATION</McText>*/}
                {/*    <View*/}
                {/*        style={{*/}
                {/*        height: 250*/}
                {/*    }}>*/}
                {/*        <MapView*/}
                {/*            provider={PROVIDER_GOOGLE}*/}
                {/*            style={{*/}
                {/*                height: 250,*/}
                {/*                borderRadius: 30,*/}
                {/*                marginTop: 20*/}
                {/*            }}*/}
                {/*            minZoomLevel={15}*/}
                {/*            initialRegion={Region}*/}
                {/*            customMapStyle={mapDarkStyle}*/}
                {/*            pointerEvents="none">*/}
                {/*        </MapView>*/}
                {/*    </View>*/}
                {/*    <View style={{paddingBottom: 150}}/>*/}
                {/*</LocationSection>*/}

                <Animatable.View animation={"fadeInUpBig"} style={styles.footer}>
                    <Text style={{color: 'white', fontSize: 20, paddingBottom: 20}}>Team members (required 4)</Text>
                    <View style={{paddingHorizontal: 15}}>
                        <InputField
                            placeholder="Enter tournament name"
                            label="Name"
                            onChange={() => {}}
                            errorText={""}
                            checked={true}>
                        </InputField>
                        <InputField
                            placeholder="Enter tournament name"
                            label="Name"
                            onChange={() => {}}
                            errorText={""}
                            checked={true}>
                        </InputField>

                        <InputField
                            placeholder="Enter tournament name"
                            label="Name"
                            onChange={() => {}}
                            errorText={""}
                            checked={true}>
                        </InputField>

                        <InputField
                            placeholder="Enter tournament name"
                            label="Name"
                            onChange={() => {}}
                            errorText={""}
                            checked={true}>
                        </InputField>
                    </View>
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={() => {}}
                                style={[
                                    styles.signIn,
                                    {
                                        backgroundColor: "#03DAC5",
                                        marginTop: 15,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.textSign,
                                        {
                                            color: "#121212",
                                        },
                                    ]}
                                >
                                    Confirm
                                </Text>
                            </TouchableOpacity>
                        </View>
                </Animatable.View>
            </ScrollView>
            {/*<BottomBarSection>*/}
            {/*    <View style={{*/}
            {/*        flexDirection: 'row',*/}
            {/*        justifyContent: 'space-between',*/}
            {/*        alignItems: 'center',*/}
            {/*        marginHorizontal: 30*/}
            {/*    }}>*/}
            {/*        <View>*/}
            {/*            <McText style={{opacity: 0.5, letterSpacing: 1, fontFamily: 'Roboto_500Medium'}}>PRICE</McText>*/}
            {/*            <View style={{*/}
            {/*                flexDirection: 'row',*/}
            {/*                justifyContent: 'flex-end',*/}
            {/*                alignItems: 'flex-end'}}>*/}
            {/*                <McText h2 style={{color: '#03DAC5', fontFamily: 'Roboto_500Medium'}}>Free</McText>*/}
            {/*                <McText h3> /person</McText>*/}
            {/*            </View>*/}
            {/*        </View>*/}
            {/*            <TouchableOpacity*/}
            {/*                onPress={()=>{navigation.navigate('Ticket')}}>*/}
            {/*                <LinearGradient*/}
            {/*                    colors={['#03DAC5', '#03DAC5']}*/}
            {/*                    start={{ x: 0, y: 1 }}*/}
            {/*                    end={{ x: 1, y: 1}}*/}
            {/*                    style={{*/}
            {/*                        width: 173,*/}
            {/*                        height: 53,*/}
            {/*                        justifyContent: 'center',*/}
            {/*                        alignItems: 'center',*/}
            {/*                        borderRadius: 15*/}
            {/*                    }}>*/}
            {/*                    <View style={{*/}
            {/*                        flexDirection: 'row',*/}
            {/*                        justifyContent: 'center',*/}
            {/*                        alignItems: 'center'*/}
            {/*                    }}>*/}
            {/*                        <McText h3>Get ticket</McText>*/}

            {/*                    </View>*/}
            {/*                </LinearGradient>*/}
            {/*            </TouchableOpacity>*/}
            {/*    </View>*/}
            {/*</BottomBarSection>*/}
        </View>
    );
};

const SectionImageHeader = styled.View`
  flex: 1;
  justify-content: space-between;
  margin-top: ${Platform.OS === 'is' ? '40px' : '20px'}
  margin-left: 30px;
  margin-right: 30px;
`;

const DescriptionSection = styled.View`
  margin: 15px 30px;
  
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
    footer: {
        flex: 3,
        backgroundColor: COLORS.tabBar,
        borderRadius: 30,
        paddingHorizontal: 50,
        paddingVertical: 30,
        marginHorizontal: 15
    },
    button: {
        alignItems: "center",
        marginTop: 50,
    },
    signIn: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
    },
    textSign: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default EventDetail;
