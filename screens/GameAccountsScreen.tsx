import React, {useRef, useState, useEffect, useMemo} from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    ScrollView,
    Image, LayoutAnimation, Alert, Pressable, Switch, TextInput
} from 'react-native';
import Modal from "react-native-modal";
import {Picker} from '@react-native-picker/picker';
import ModalSelector from 'react-native-modal-selector'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import {colors} from "../assets/colors/colors";
import {UIImagePickerPresentationStyle} from "expo-image-picker/build/ImagePicker.types";
// import {GetUserInfo, GetId} from "../services";
import {Avatar, Caption, Title, TouchableRipple} from "react-native-paper";
import HomeScreen from "./HomeScreen";
import GameAccount from "../components/GameAccount";

interface Contact {
    emailAddress: string;
    phoneNumber: string;
    discordName: string;
}

interface User {
    name: string;
    surname: string;
    contact: Contact;
}

class GameAccountsScreen extends React.Component <any, any>{
    private addNewEle: boolean;
    private index: number;
    private scrollView: any;
    private selector: any;

    constructor(props) {
        super(props);
        this.state = { valueArray: [], disabled: false , modalVisible: false, selectedLanguage: 'Counter Strike', nickname: '', textInputValue: ''}
        this.addNewEle = false;
        this.index = 0;



    }

    afterAnimationComplete = () => {
        this.index += 1;
        this.setState({ disabled: false });
    }

    addMore = () => {
        this.addNewEle = true;
        if(this.state.textInputValue == '' || this.state.nickname == ''){
            Alert.alert("Account data cannot be empty");
            return
        }

        const newlyAddedValue = { id: "id_" + this.index, game: this.state.textInputValue, text:  this.state.nickname };

        this.setState({
            disabled: true,
            valueArray: [...this.state.valueArray, newlyAddedValue],
            modalVisible: false,
            nickname: ''
        });
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    remove(id) {
        this.addNewEle = false;
        const newArray = [...this.state.valueArray];
        newArray.splice(newArray.findIndex(ele => ele.id === id), 1);

        this.setState(() => {
            return {
                valueArray: newArray
            }
        }, () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        });
    }
    


    render() {
        const { modalVisible } = this.state;
        const { selectedLanguage } = this.state;
        const { nickname } = this.state;
        let index = 0;
        const data = [
            { key: index++, section: true, label: 'Games' },
            { key: index++, label: 'Counter Strike' },
            { key: index++, label: 'RocketLeague' },
            { key: index++, label: 'League of legends'},
            // // etc...
            // // Can also add additional custom keys which are passed to the onChange callback
            // { key: index++, label: 'Vegetable', customKey: 'Not a fruit' }
        ];
        return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    this.setModalVisible(!modalVisible);
                }}>

                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Enter your account details</Text>

                            <Text style={styles.modalText}>Game: </Text>
                            <ModalSelector
                                data={data}
                                initValue="Select your game"
                                supportedOrientations={['portrait']}
                                accessible={true}
                                scrollViewAccessibilityLabel={'Scrollable options'}
                                cancelButtonAccessibilityLabel={'Cancel Button'}
                                onChange={(option)=>{ this.setState({textInputValue:option.label})}}>

                                <TextInput
                                    style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
                                    editable={false}
                                    placeholder="Select your game"
                                    value={this.state.textInputValue} />

                            </ModalSelector>
                            <Text>Nickname: </Text>
                        <TextInput
                            style={{height: 40}}
                            placeholder="Type your nickname"
                            onChangeText={(value) => {this.setState({nickname: value})}}
                            defaultValue={''}
                        />

                        <Pressable
                            style={[styles.button]}
                            onPress={() => this.setModalVisible(!modalVisible)}
                        >
                            <Icon name="close" size={24}/>
                        </Pressable>
                        <Pressable
                            style={[ styles.buttonClose]}
                            onPress={this.addMore}
                        >
                            <Text>Add game account</Text>
                        </Pressable>
                </View>
            </Modal>
                <View style={styles.userInfoSection}>
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                        <Avatar.Image
                            source={{
                                uri: 'https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec',
                            }}
                            size={80}
                        />
                        <View style={{marginLeft: 20}}>
                            <Title style={[styles.title, {
                                marginTop: 15,
                                marginBottom: 5,
                            }]}>Jan Kowalski</Title>
                            <Caption style={styles.caption}>@hasan</Caption>
                        </View>
                    </View>
                </View>

                <ScrollView
                    ref={scrollView => this.scrollView = scrollView}
                    onContentSizeChange={() => {
                        this.addNewEle && this.scrollView.scrollToEnd();
                    }}
                >
                    <View style={{ flex: 1, padding: 4 }}>
                        {this.state.valueArray.map(ele => {
                            return (
                                <GameAccount
                                    key={ele.id}
                                    item={ele}
                                    removeItem={(id) => this.remove(id)}
                                    afterAnimationComplete={this.afterAnimationComplete}
                                />
                            )
                        })}
                    </View>
                </ScrollView>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.addBtn}
                    disabled={this.state.disabled}
                    onPress={() => this.setModalVisible(true)}
                >
                    <Image source={require('../assets/images/addButton.png')} style={styles.btnImage} />
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

export default GameAccountsScreen;

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#121212'
        },
        addBtn: {
            position: 'absolute',
            right: 25,
            bottom: 25,
            width: 70,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            backgroundColor: 'white'
        },
        btnImage: {
            resizeMode: 'contain',
            width: '100%',

        },
        userInfoSection: {
            paddingHorizontal: 30,
            marginBottom: 25,
            backgroundColor: "#121212"
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#fff',
        },
        caption: {
            fontSize: 14,
            lineHeight: 14,
            fontWeight: '500',
            color: '#fff'
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
            marginTop: 22
        },
        modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        },
        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
            position: 'absolute',
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
            backgroundColor: "#2196F3",
        },
        textStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
        },
        modalText: {
            marginBottom: 15,
            textAlign: "center"
        },
        containerModal: {
            flex: 1,
            paddingTop: 40,
            alignItems: "center"
        }
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
