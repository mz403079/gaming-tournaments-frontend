import React from "react";
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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
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
} from "@expo-google-fonts/roboto";
import { Feather, FontAwesome } from "@expo/vector-icons";

import { SignInRequest } from "../services";
import { InputField } from "../components/UI";
const SignInScreen = ({ navigation }: { navigation: any }) => {
   function goHome() {
    console.log("eeo")
   }
  function sign() {
      goHome();
    SignInRequest({
      password: data.password,
      username: data.username,
      onSuccess: goHome
    })
    }

  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
  });

  function textInputChange(val: string) {
    if (val.length != 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  }

  function passwordInputChange(val: string) {
    setData({
      ...data,
      password: val,
    });
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#121212"} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View animation={"fadeInUpBig"} style={styles.footer}>
        <InputField
          placeholder="Enter your email"
          label="Email"
          onChange={textInputChange}
        >
          <FontAwesome name={"user-o"} color={"#03DAC5"} size={20} />
        </InputField>
        <InputField
          placeholder="Enter your password"
          label="Password"
          password={true}
          onChange={passwordInputChange}
        >
          <FontAwesome name={"lock"} color={"#03DAC5"} size={20} />
        </InputField>

        <View style={styles.button}>
          <TouchableOpacity
            style={[
              styles.signIn,
              {
                backgroundColor: "#03DAC5",
                marginTop: 15,
              },
            ]}
            onPress={() => {
              sign();
            }}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#121212",
                },
              ]}
            >
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={[
              styles.signIn,
              {
                borderColor: "#03DAC5",
                borderWidth: 2,
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#03DAC5",
                },
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#303030",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Roboto_700Bold",
    fontSize: 40,
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
