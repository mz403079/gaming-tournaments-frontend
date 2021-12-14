import React, {useRef, useState, useEffect, useMemo} from "react";
import {
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    ScrollView,
    Image,
    LayoutAnimation,
    Alert,
    Pressable,
    Switch,
    TextInput,
    ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import {Picker} from "@react-native-picker/picker";
import ModalSelector from "react-native-modal-selector";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Avatar, Caption, Title, TouchableRipple} from "react-native-paper";
import GameAccount from "../components/GameAccount";
import {isLoaded} from "expo-font";
import {GetId, AddGameAccount, DeleteGameAccount} from "../services/";
import ActionButton from "react-native-action-button";

interface game {
    gameId: number;
    name: string;
}

interface gameAccount {
    gameAccountId: string;
    inGameName: string;
    game: game;
}

const GameAccountsScreen = () => {
    const [state, setState] = useState({
        disabled: false,
        selectedLanguage: "LOL",
        nickname: "",
        gameName: "",
        gameId: 0,
    });
    const gamesURL = "https://gen-gg.herokuapp.com/api/getGames";
    const gamesAccountsURL = "https://gen-gg.herokuapp.com/api/getGameAccounts/";
    const [userId, setUserId] = useState<number>(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [index, setIndex] = useState(0);
    const [games, setGames] = useState<game[]>([]);
    const [gameAccounts, setGameAccounts] = useState<gameAccount[]>([]);
    const [refeshKey, setRefreshKey] = useState(0);
    const [loading, setLoading] = useState(true);
    let getGames = () => {
        fetch(gamesURL)
            .then((response) => response.json())
            .then((json) => setGames(json))
            .catch((error) => console.error(error));
    };
    let getGameAccounts = () => {
        GetId()
            .then((res) => fetch(gamesAccountsURL + res))
            .then((response) => response.json())
            .then((json) => setGameAccounts(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };
    useEffect(() => {
        getGames();
        getGameAccounts();
        GetId().then((res) => setUserId(res));
    }, []);

    useEffect(() => {
        getGameAccounts();
    }, [refeshKey]);

    const afterAnimationComplete = () => {
        setIndex(index + 1);
        setState({...state, disabled: false});
    };

    const handleResponse = (response: string) => {
        if(response === "name taken")
            Alert.alert("This account is already connected!");
        else
            setRefreshKey(refeshKey + 1);
    }

    const addMore = () => {
        if (state.gameName == "" || state.nickname == "") {
            Alert.alert("Account data cannot be empty");
            return;
        }

        AddGameAccount(
            {
                inGameName: state.nickname,
                game: {gameId: state.gameId, name: state.gameName},
            },
            userId
        ).then((response) => handleResponse(response))
          

        setModalVisible(false);
    };
    
    const filteredGames = () => {
        const result = gameAccounts.map(({ game }) => game.name)
        const difference = games.filter(x => !result.includes(x.name))

        return difference
    }
    const remove = (id: number) => {
        DeleteGameAccount(id).then(() => setRefreshKey(refeshKey + 1));
    }

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#121212",
                }}
            >
                <ActivityIndicator size={"large"}/>
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>

                    <Text style={[styles.modalText, {fontSize: 18, paddingBottom: 15, paddingTop: 15}]}>Enter your account details</Text>

                    <View style={{flexDirection: 'row', justifyContent: 'center', alignSelf: 'flex-start'}}>
                        <Text style={[styles.modalText, {fontSize: 18, paddingRight: 15, paddingBottom: 20}]}>Game: </Text>

                        <ModalSelector
                            data={filteredGames()}
                            keyExtractor={(item) => item.gameId}
                            labelExtractor={(item) => item.name}
                            initValue="Select your game"
                            supportedOrientations={["portrait"]}
                            accessible={true}
                            scrollViewAccessibilityLabel={"Scrollable options"}
                            cancelButtonAccessibilityLabel={"Cancel Button"}
                            onChange={(option) => {
                                setState({
                                    ...state,
                                    gameName: option.name,
                                    gameId: option.gameId,
                                });
                            }}
                        >
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderColor: "#ccc",
                                    color: '#03DAC5',
                                    padding: 15,
                                    borderRadius: 15,
                                    height: 30,
                                }}
                                editable={false}
                                placeholderTextColor="#626262FF"
                                placeholder="Select your game"
                                value={state.gameName}
                            />
                        </ModalSelector>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignSelf: 'flex-start', alignItems: 'center', paddingBottom: 15}}>
                        <Text style={[styles.modalText, {fontSize: 18, paddingRight: 15, paddingBottom: 15}]}>Nickname: </Text>
                        <TextInput
                            style={{height: 40, color: '#03DAC5', backgroundColor: '#282828', padding: 15, borderRadius: 10}}
                            placeholder="Type your nickname"
                            placeholderTextColor="#626262FF"
                            onChangeText={(value) => {
                                setState({...state, nickname: value});
                            }}
                            defaultValue={""}
                        />
                    </View>
                    <Pressable
                        style={[styles.button]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Icon name="close" size={24} color='white'/>
                    </Pressable>
                    <Pressable style={[styles.buttonClose]} onPress={addMore}>
                        <Text style={{color: '#121212', fontSize: 16, paddingHorizontal: 12}}>Add game account</Text>
                    </Pressable>
                </View>
            </Modal>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection: "row", marginTop: 15}}>
                    <Avatar.Image
                        source={{
                            uri: "https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec",
                        }}
                        size={80}
                    />
                    <View style={{marginLeft: 20}}>
                        <Title
                            style={[
                                styles.title,
                                {
                                    marginTop: 15,
                                    marginBottom: 5,
                                },
                            ]}
                        >
                            Jan Kowalski
                        </Title>
                        <Caption style={styles.caption}>@hasan</Caption>
                    </View>
                </View>
            </View>

            <ScrollView>
                <View style={{flex: 1, padding: 4}}>
                    {gameAccounts.map((ele) => {
                        return (
                            <GameAccount
                                key={ele.gameAccountId}
                                item={ele}
                                removeItem={(id) => remove(id)}
                                afterAnimationComplete={afterAnimationComplete}
                            />
                        );
                    })}
                </View>
            </ScrollView>
            <ActionButton buttonColor="#03DAC5">
                <ActionButton.Item buttonColor='#6200EE' title="Add game account" onPress={() => setModalVisible(true)}>
                    <Icon name="account-plus" style={styles.actionButtonIcon}/>
                </ActionButton.Item>
            </ActionButton>
            {/*<TouchableOpacity*/}
            {/*  activeOpacity={0.8}*/}
            {/*  style={styles.addBtn}*/}
            {/*  disabled={state.disabled}*/}
            {/*  onPress={() => setModalVisible(true)}*/}
            {/*>*/}
            {/*  <Image*/}
            {/*    source={require("../assets/images/addButton.png")}*/}
            {/*    style={styles.btnImage}*/}
            {/*  />*/}
            {/*</TouchableOpacity>*/}
        </SafeAreaView>
    );
};

export default GameAccountsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    addBtn: {
        position: "absolute",
        right: 25,
        bottom: 25,
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: "white",
    },
    btnImage: {
        resizeMode: "contain",
        width: "100%",
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
        backgroundColor: "#121212",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: "500",
        color: "#fff",
    },
    sheetContainer: {
        // add horizontal space
        marginHorizontal: 24,
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "#303030",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        position: "absolute",
        right: 2,
        top: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#03DAC5",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: 'white',

    },
    containerModal: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center",
    },
});

// render() {
//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.userInfoSection}>
//                 <View style={{flexDirection: 'row', marginTop: 15}}>
//                     <Avatar.Image
//                         source={{
//                             uri: 'https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec',
//                         }}
//                         size={80}
//                     />
//                     <View style={{marginLeft: 20}}>
//                         <Title style={[styles.title, {
//                             marginTop: 15,
//                             marginBottom: 5,
//                         }]}>Jan Kowalski</Title>
//                         <Caption style={styles.caption}>@hasan</Caption>
//                     </View>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// };
