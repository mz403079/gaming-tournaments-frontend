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
    Platform,
} from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker, MapEvent} from "react-native-maps";

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { markers, mapDarkStyle} from '../model/mapData';

import { useTheme } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const MapScreen = () => {
    const [shouldShow, setShouldShow] = useState(true);
    const initialMapState = {
        markers,
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
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= state.markers.length) {
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

    const interpolations = state.markers.map((marker, index) => {
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

    return (
        <View style={styles.container}>
            <MapView
                ref={_map}
                initialRegion={state.region}
                style={styles.container}
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapDarkStyle}
                onPress={(e) => onMapPress(e)}
            >
                {state.markers.map((marker, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolations[index].scale,

                            }
                        ]
                    }
                    return (
                        <Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
                            <Animated.View style={[styles.markerWrap]}>
                                <Animated.Image
                                    source={require('../assets/images/marker.png')}
                                    style={[styles.marker, scaleStyle]}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        </Marker>
                    );
                })}
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
            {shouldShow ? (
                <><ScrollView
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
                </ScrollView><Animated.ScrollView
                    ref={_scrollView}
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollView}
                    pagingEnabled
                    snapToInterval={CARD_WIDTH + 20}
                    snapToAlignment={"center"}
                    contentInset={{
                        top: 0,
                        left: SPACING_FOR_CARD_INSET,
                        bottom: 0,
                        right: SPACING_FOR_CARD_INSET
                    }}
                    contentContainerStyle={{
                        paddingHorizontal: Platform.OS == 'android' ? SPACING_FOR_CARD_INSET : 0
                    }}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: mapAnimation,
                                    }
                                },
                            },
                        ]
                    )}>
                    {state.markers.map((marker, index) => (
                        <View style={styles.card} key={index}>
                            <Image
                                source={marker.image}
                                style={styles.cardImage}
                                resizeMode={"cover"}/>
                            <View style={styles.textContent}>
                                <Text numberOfLines={1} style={styles.cardTitle}>{marker.title}</Text>
                                <Text numberOfLines={1} style={styles.cardDescription}>{marker.title}</Text>
                            </View>
                        </View>
                    ))}
                </Animated.ScrollView></>
                ) : <></>}
        </View>
)};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    }
});