import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    Animated,
    Dimensions,
    TouchableOpacity, Platform,
} from 'react-native';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import {GetEmail, GetId, GetName, GetSurname, GetUsername} from "../services";



const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;


const renderNavBar = () => (
    <View style={styles.navContainer}>
        <View style={styles.statusBar} />
        <View style={styles.navBar}>
            <TouchableOpacity style={styles.iconLeft} onPress={() => {}}>
                <Text style={{color: 'white'}}></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconRight} onPress={() => {}}>
                <Text style={{color: 'white'}}>My stats</Text>
            </TouchableOpacity>
        </View>
    </View>
);



const title = () => {
    return (
        <View style={styles.body}>
            <Text style={{color: 'white', fontSize: 25}}>Players ranking</Text>
        </View>
    );
};

interface ranking {
    userId: number,
    username: string,
    name: string,
    surname: string,
    crowns: number,
}
const RankingScreen = () => {
    const [ranking, setRanking] = useState<ranking[]>([]);
    const rankingURL = "https://gen-gg.herokuapp.com/api/getRanking"


    let getRanking = () => {
        fetch(rankingURL)
            .then((response) => response.json())
            .then((json) => setRanking(json))
            .catch((error) => console.error(error));
    };

    const renderContent = () => {
        return (
            <View style={styles.body}>
                {ranking.map((rank, index) => (
                    <View
                    key={rank.userId}
                    style={{padding: 15, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#121212'}}>
                    <Text style={{fontSize: 16, color: 'white'}}>{index+1 + '. ' + rank.username}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 18, color: 'white', fontFamily: 'Roboto_700Bold'}}>{rank.crowns}</Text>
                            <Animated.Image
                                source={require('../assets/images/king.png')}
                                style={[styles.crown]}
                                resizeMode="cover"
                            />
                        </View>
                    </View>
                    ))}
            </View>
        );
    };

    useEffect(() => {
        getRanking();
    }, []);
    return (
        <>
            <StatusBar barStyle="light-content" />
            <ReactNativeParallaxHeader
                headerMinHeight={HEADER_HEIGHT}
                headerMaxHeight={250}
                extraScrollHeight={20}
                navbarColor="#303030"
                backgroundColor="#00847AFF"
                titleStyle={styles.titleStyle}
                title={title()}

                backgroundImageScale={1.2}
                renderNavBar={renderNavBar}
                renderContent={renderContent}
                containerStyle={styles.container}
                contentContainerStyle={styles.contentContainer}
                innerContainerStyle={styles.container}
                scrollViewProps={{
                    onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
                    onScrollEndDrag: () => console.log('onScrollEndDrag'),
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
    },
    navContainer: {
        height: HEADER_HEIGHT,
        marginHorizontal: 10,
    },
    statusBar: {
        height: STATUS_BAR_HEIGHT,
        backgroundColor: 'transparent',
    },
    navBar: {
        height: NAV_BAR_HEIGHT,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    titleStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    crown: {
        width: 30,
        height: 30,
        marginLeft: 10
    },
});

export default RankingScreen;