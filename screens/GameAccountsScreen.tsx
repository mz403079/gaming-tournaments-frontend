import React, {useRef, useState, useEffect} from 'react';
import {
    ImageBackground,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import {colors} from "../assets/colors/colors";
import {UIImagePickerPresentationStyle} from "expo-image-picker/build/ImagePicker.types";
import {GetUserInfo, GetId} from "../services";
import {Avatar, Caption, Title, TouchableRipple} from "react-native-paper";
import HomeScreen from "./HomeScreen";
import Adaptable = module
import AnimatedNode = module

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

class GameAccountsScreen extends React.Component {
    private animatedValue;
    private Array_Value_Index: number;

    constructor(props)
    {
        super(props);

        this.state = {
            ViewArray: [],
            Disable_Button: false

        }

        this.animatedValue = new Animated.Value(0);

        this.Array_Value_Index = 0;

    }

    Add_New_View_Function = () =>
    {
        this.animatedValue.setValue(0);

        let New_Added_View_Value = { Array_Value_Index: this.Array_Value_Index }

        this.setState({ Disable_Button: true, ViewArray: [ ...this.state.ViewArray, New_Added_View_Value ] }, () =>
        {
            Animated.timing(
                this.animatedValue,
                {
                    easing(value: Adaptable<number>): AnimatedNode<number> {
                        return undefined;
                    },
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true
                }
            ).start(() =>
            {
                this.Array_Value_Index = this.Array_Value_Index + 1;

                this.setState({ Disable_Button: false });
            });
        });
    }

    render()
    {
        const AnimationValue = this.animatedValue.interpolate(
            {
                inputRange: [ 0, 1 ],

                outputRange: [ -59, 0 ]
            });

        let Render_Animated_View = this.state.ViewArray.map(( item, key ) =>
        {
            if(( key ) == this.Array_Value_Index)
            {
                return(

                    <Animated.View
                        key = { key }
                        style = {[ styles.Animated_View_Style, { opacity: this.animatedValue, transform: [{ translateY: AnimationValue }] }]}>

                        <Text style = { styles.View_Inside_Text } > This Is Row { item.Array_Value_Index } </Text>

                    </Animated.View>

                );
            }
            else
            {
                return(

                    <View
                        key = { key }
                        style = { styles.Animated_View_Style }>

                        <Text style = { styles.View_Inside_Text } > This Is Row { item.Array_Value_Index } </Text>

                    </View>

                );
            }
        });

        return(
            <View style = { styles.MainContainer }>

                <ScrollView>

                    <View style = {{ flex: 1, padding: 2 }}>
                        {
                            Render_Animated_View
                        }
                    </View>

                </ScrollView>

                <TouchableOpacity
                    activeOpacity = { 0.7 }
                    style = { styles.TouchableOpacityStyle }
                    disabled = { this.state.Disable_Button }
                    onPress = { this.Add_New_View_Function }>

                    <Image
                        source={{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}}
                        style = { styles.FloatingButtonStyle }
                    />

                </TouchableOpacity>

            </View>
        );
    }
}

export default GameAccountsScreen;

const styles = StyleSheet.create(
    {
        MainContainer:
            {
                flex: 1,
                backgroundColor: '#eee',
                justifyContent: 'center',
                paddingTop: (Platform.OS == 'ios') ? 20 : 0
            },

        Animated_View_Style:
            {
                height: 60,
                backgroundColor: '#FF9800',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5
            },

        View_Inside_Text:
            {
                color: '#fff',
                fontSize: 24
            },

        TouchableOpacityStyle:{

            position: 'absolute',
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            right: 30,
            bottom: 30,
        },

        FloatingButtonStyle: {

            resizeMode: 'contain',
            width: 50,
            height: 50,
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
