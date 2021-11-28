import React from 'react';
import {
    View,
    Text,
    Button,
    Dimensions,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    StatusBar,
    Platform,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
    useFonts,
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';
import {Feather, FontAwesome} from "@expo/vector-icons";
import {AuthContext} from "../components/context";
import { SigIn as SignInRequest } from '../services';

const SignInScreen = ({navigation}: {navigation: any}) => {
    const { signIn } = React.useContext(AuthContext);
    function sign() {
        SignInRequest({
          password: data.password,
          username: data.email,
        });
        signIn();
      }
    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry:true
    });

    function textInputChange(val: string) {
        if(val.length != 0) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        }else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    }

    function passwordInputChange(val: string) {
        setData({
            ...data,
            password: val,

        })
        
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'#121212'}
                       barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View
                animation={"fadeInUpBig"}
                style={styles.footer}>
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name={"user-o"}
                        color={"#03DAC5"}
                        size={20}/>
                    <TextInput
                        placeholder={"Enter your Email"}
                        style={styles.textInput}
                        autoCapitalize="none"
                        secureTextEntry={false}
                        onChangeText={(val)=>textInputChange(val)}/>
                    {data.check_textInputChange ?
                        <Animatable.View animation={"bounceIn"}>
                            <Feather
                                name={"check-circle"}
                                color={"green"}
                                size={20}/>
                        </Animatable.View>
                        : null}

                </View>

                <Text style={[styles.text_footer, {marginTop: 35}]}>Password</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name={"lock"}
                        color={"#03DAC5"}
                        size={20}/>
                    <TextInput
                        placeholder={"Enter your Password"}
                        style={styles.textInput}
                        autoCapitalize="none"
                        secureTextEntry={data.secureTextEntry}
                        onChangeText={(val)=>passwordInputChange(val)}
                    />
                    <TouchableOpacity
                    onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ?
                            <Feather
                                name={"eye-off"}
                                color={"grey"}
                                size={20}
                            />
                            :
                            <Feather
                                name={"eye"}
                                color={"grey"}
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity
                        style={[styles.signIn, {
                            backgroundColor: '#03DAC5',
                            marginTop: 15
                        }]}
                        onPress={() => {sign()}}
                        >
                        <Text style={[styles.textSign, {
                            color: '#121212'
                        }]}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress = {() => navigation.navigate('SignUp')}
                        style={[styles.signIn, {
                            borderColor: '#03DAC5',
                            borderWidth: 2,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#03DAC5'
                        }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
}

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#303030',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'Roboto_700Bold',
        fontSize: 40
    },
    text_footer: {
        color: '#03DAC5',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#03DAC5',
        paddingBottom: 5,
        paddingTop: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#03DAC5',
        fontSize: 16
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});