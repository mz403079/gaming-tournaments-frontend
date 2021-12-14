import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Animated,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform, ImageBackground, Alert, ActivityIndicator,
} from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker, MapEvent, Callout} from "react-native-maps";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ActionButton from 'react-native-action-button';
import {mapDarkStyle} from '../model/mapData';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import * as Location from 'expo-location';
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const MapScreen = () => {
    const [shouldShow, setShouldShow] = useState(true);
    const [location, setLocation] = useState(null);
    const [userLatitude, setUserLatitude] = useState(null);
    const [userLongitude, setUserLongitude] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [tournaments, setTournaments] = useState([]);

    const tournamentsURL = 'https://gen-gg.herokuapp.com/api/getTournaments';

    let getTournaments = () => {
        fetch(tournamentsURL)
            .then((response) => response.json())
            .then((json) => setTournaments(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    const initialMapState = {
        tournaments,
        categories: [
            {
                name: 'Rocket League',
                // icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18}/>,
            },
            {
                name: 'CS:GO',
                // icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18}/>,
            },
            {
                name: 'League of Legends',
                // icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18}/>,
            },
            {
                name: 'Valorant',
                // icon: <MaterialCommunityIcons name="food" style={styles.chipsIcon} size={18}/>,
            },
            {
                name: 'Tekken',
                // icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15}/>,
            },
        ],
        region: {
            latitude: 51.746142068849295,
            longitude: 19.455375939235186,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
        },
    };

    const [state, setState] = React.useState(initialMapState);
    const onLocationSelect = (event: MapEvent) => {
        console.log(event.nativeEvent.coordinate);
    }

    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);



    useEffect(() => {
        getTournaments()
        console.log(tournaments)
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= state.tournaments.length) {
                index = state.markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if( mapIndex !== index ) {
                    mapIndex = index;
                    const { coordinate } = state.markers[index];
                    // @ts-ignore
                    _map.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: state.region.latitudeDelta,
                            longitudeDelta: state.region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);

        });
    });

    const mapMarkers = () => {
        return tournaments.map((tournament) => <Marker
            key={tournament.id}
            coordinate={{ latitude: tournament.lat, longitude: tournament.lng }}
            title={tournament.location}
            description={tournament.comments}
        >
        </Marker >)
    }

    const interpolations = tournaments.map((marker, index) => {
        const inputRange = [
            (index -1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];
        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.7, 1],
            extrapolate: "clamp"
        });

        return { scale }
    });

    const _map = React.useRef(null);

    const onMarkerPress = (mapEventData) => {
        setShouldShow(true)
        setTimeout( () => {
            const markerID = mapEventData._targetInst.return.index;
            let x = (markerID * CARD_WIDTH) + (markerID * 20);
            if (Platform.OS === 'ios') {
                x = x - SPACING_FOR_CARD_INSET;
            }
            // @ts-ignore
            _scrollView.current.scrollTo(({x: x, y: 0, animated: false}));
        }, 500)
    }


    const onMapPress = (event: any) => {
        setShouldShow(false)
        setTimeout( () => {
        }, 500)
    }
    const _scrollView = React.useRef(null);

    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212'}}>
                <ActivityIndicator size={"large"}/>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <MapView
                ref={_map}
                initialRegion={state.region}
                style={styles.container}
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapDarkStyle}
                onPress={onMapPress}
            >
                {mapMarkers()}
                {/*{tournaments.map((marker, index) => {*/}
                {/*    const scaleStyle = {*/}
                {/*        transform: [*/}
                {/*            {*/}
                {/*                scale: interpolations[index].scale,*/}

                {/*            }*/}
                {/*        ]*/}
                {/*    }*/}
                {/*    return (*/}
                {/*        <Marker key={index} coordinate={marker.coordinate}>*/}
                {/*            <Animated.View style={[styles.markerWrap]}>*/}
                {/*                <Animated.Image*/}
                {/*                    source={require('../assets/images/marker.png')}*/}
                {/*                    style={[styles.marker, scaleStyle]}*/}
                {/*                    resizeMode="cover"*/}
                {/*                />*/}
                {/*            </Animated.View>*/}
                {/*            <Callout tooltip>*/}
                {/*                <View>*/}
                {/*                    <View style={{height: 80, width: 260, flexDirection: 'row', borderRadius: 20, borderColor: '#03DAC5', borderWidth: 1, alignSelf:'baseline', overflow: 'hidden', backgroundColor: '#303030'}}>*/}
                {/*                        <View style={{alignItems: 'center', flexDirection: 'row'}}>*/}
                {/*                            <View style={{width: 55, height: 55, backgroundColor: '#E4FFF9', borderRadius: 12, margin: 12, alignItems: 'center', justifyContent: 'center'}}>*/}
                {/*                                <Text style={{fontFamily: "Roboto_700Bold", fontSize: 14, color: "#03DAC5"}}>DEC</Text>*/}
                {/*                                <Text style={{fontFamily: "Roboto_500Medium", fontSize: 14}}>14</Text>*/}
                {/*                            </View>*/}
                {/*                            <View>*/}
                {/*                                <Text style={{fontFamily: "Roboto_700Bold", color: '#fff', fontSize: 15, marginBottom: 5}}>NAME</Text>*/}

                {/*                                <View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
                {/*                                    <View>*/}
                {/*                                        <Text style={{color: '#fff'}}>Chicago Stadium</Text>*/}
                {/*                                        <Text style={{color: '#03DAC5'}}>1901 W Madison St</Text>*/}
                {/*                                    </View>*/}
                {/*                                </View>*/}
                {/*                            </View>*/}
                {/*                        </View>*/}
                {/*                    </View>*/}
                {/*                    <View style={styles.arrowBorder}/>*/}
                {/*                    <View style={styles.arrow}/>*/}
                {/*                </View>*/}
                {/*            </Callout>*/}
                {/*        </Marker>*/}
                {/*    );*/}
                {/*})}*/}
            </MapView>
            <View style={styles.searchBox}>
                <TextInput
                    placeholder={"Search here"}
                    placeholderTextColor={"#000"}
                    autoCapitalize={"none"}
                    style={{flex:1, padding: 5, marginLeft: 8}}/>
                <Ionicons name={"ios-search"} size={20}
                          style={{marginRight: 10, display: 'flex', alignSelf:'center'}}/>
            </View>
            <ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    height={50}
                    style={styles.chipsScrollView}
                    contentInset={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 20
                    }}
                    contentContainerStyle={{
                        paddingRight: Platform.OS == 'android' ? 20 : 0
                    }}>
                    {state.categories.map((category, index) => (
                        <TouchableOpacity key={index} style={styles.chipsItem}>
                            {/*{category.icon}*/}
                            <Text>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

            <ActionButton buttonColor="#03DAC5" >
                <ActionButton.Item buttonColor='#6200EE' title="Create new event" onPress={() => setShouldShow(true)}>
                    <Icon name="md-create" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View>
    )};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    markerCenter: {
        position: 'absolute',
        width: 25,
        height: 25,
        top:Dimensions.get('window').height/2,
        left:Dimensions.get('window').width/2,
    },
    searchBox: {
        position:'absolute',
        marginTop: Platform.OS === 'ios' ? 55 : 30,
        flexDirection:"row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf:'center',
        borderRadius: 25,
        padding: 8,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    chipsScrollView: {
        position:'absolute',
        top:Platform.OS === 'ios' ? 110 : 90,
        paddingHorizontal:10
    },
    chipsIcon: {
        marginRight: 5,
    },
    bubble: {
        borderRadius: 6,
        borderColor: '#03DAC5',
        backgroundColor: '#303030',
        borderWidth: 0.5,
        padding: 15,
        width: 150
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#03DAC5',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#03DAC5',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5
    },
    chipsItem: {
        flexDirection:"row",
        backgroundColor:'#fff',
        borderRadius:20,
        padding:8,
        paddingHorizontal:20,
        marginHorizontal:10,
        height:35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#303030",
        borderRadius: 20,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
        borderColor: '#03DAC5',
        borderWidth: 0.5
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardTitle: {
        fontSize: 16,
        // marginTop: 5,
        fontWeight: "bold",
        color: "#fff",
    },
    cardDescription: {
        fontSize: 12,
        color: "#03DAC5",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width:50,
        height:50,
    },
    marker: {
        width: 30,
        height: 30,
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '100%',
        padding:5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    image: {
        width: 120,
        height: 80
    }
});