import {StyleSheet, Dimensions, View, StatusBar, SafeAreaView} from "react-native";
import React from "react";
import MapView from 'react-native-maps';
import {colors} from "../assets/colors/colors";
const MapScreen = () => {
    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background
        }}>
            <StatusBar barStyle="light-content"/>
        <View style={styles.container}>
            <MapView style={styles.map} />
        </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
export default MapScreen;