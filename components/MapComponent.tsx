import {StyleSheet, Dimensions, View, StatusBar, SafeAreaView} from "react-native";
import React from "react";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {colors} from "../assets/colors/colors";
import GamingMarker from "../assets/images/marker.svg"
import {mapDarkStyle} from "../model/mapData";
const MapScreen = () => {
    return (
        <MapView provider={PROVIDER_GOOGLE}
                 style={styles.map}
                 region={{
                     latitude: 37.78825,
                     longitude: -122.4324,
                     latitudeDelta: 0.015,
                     longitudeDelta: 0.0121,
                 }}
                customMapStyle={mapDarkStyle}>
            <Marker
            coordinate={{
                latitude: 37.78825,
                longitude: -122.4324,
            }}
            >
                <GamingMarker width={50} height={40}/>
            </Marker>
        </MapView>
    );
}
const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: '100%'
    },
});
export default MapScreen;