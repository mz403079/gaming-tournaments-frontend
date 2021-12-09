import React, { useEffect } from "react";
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
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { InputField } from "../components/UI";
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
import { SignUpRequest, SignInRequest } from "../services";
import {AuthContext} from "../components/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface User {
  token:string
  type:string
  id:number
  username:string
  email: string
  roles:string[]
}
const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const { signIn } = React.useContext(AuthContext);
  function register() {
    SignUpRequest({
      username: data.username,
      password: data.password,
      email: data.email,
      name: data.name,
      surname: data.surname,
    }).then(() => {
      SignInRequest({
        plainPassword: data.password,
        username: data.username,
      });
      setTimeout(async () => {
        const user = await AsyncStorage.getItem("user")
        if (user){
          const  a:User = JSON.parse(user)
          signIn(a)
        }
      }, 1000);
    });
   
  }
  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
  });
  const [errorMessages, setErrorMessages] = React.useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    nameError: "",
    surnameError: "",
  });
  function validateForm() {
    const { username, email, password, confirmPassword, name, surname } = data;
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const passwordReg =
      /^(?=.*[a-z])(?=.*d)(?=.*[#$^+=!*()@%&]).{8,16}$/;
    setErrorMessages({
      ...errorMessages,
      usernameError:
        username.length > 6 || username.length === 0 ? "" : "Username must be minimum 6 characters",
      emailError: emailReg.test(email) || email.length === 0 ? "" : "Email is not correct",
      // COMMENTED FOR SIMPLER TESTING
      // passwordError: passwordReg.test(password) || password.length === 0
      //   ? ""
      //   : "Minimum 1 letter,1 number,1 special character and between 8 and 16 characters",
      confirmPasswordError:
        password === confirmPassword || confirmPassword.length === 0 ? "" : "Passwords do not match",
      nameError: name.length > 0 || name.length === 0 ? "" : "Fill your name",
      surnameError: surname.length > 0 || surname.length === 0 ? "" : "Fill your surname",
    });
  }
  useEffect(() => {
    validateForm();
  }, [data]);

  function onChangeUsername(val: string) {
    setData({
      ...data,
      username: val,
    });
  }
  function onChangeEmail(val: string) {
    setData({
      ...data,
      email: val,
    });
  }
  function onChangePassword(val: string) {
    setData({
      ...data,
      password: val,
    });
  }

  function onChangeConfirmPassword(val: string) {
    setData({
      ...data,
      confirmPassword: val,
    });
  }
  function onChangeName(val: string) {
    setData({
      ...data,
      name: val,
    });
  }
  function onChangeSurname(val: string) {
    setData({
      ...data,
      surname: val,
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
          placeholder="Enter your username"
          label="Username"
          onChange={onChangeUsername}
          errorText={errorMessages.usernameError}
          checked={errorMessages.usernameError === ""}
        >
          <FontAwesome name={"user-o"} color={"#03DAC5"} size={20} />
        </InputField>
        <InputField
          placeholder="Enter your email"
          label="Email"
          onChange={onChangeEmail}
          errorText={errorMessages.emailError}
        >
          <FontAwesome name={"user-o"} color={"#03DAC5"} size={20} />
        </InputField>
        <InputField
          placeholder="Enter your password"
          label="Password"
          password={true}
          onChange={onChangePassword}
          errorText={errorMessages.passwordError}
          checked={errorMessages.emailError === ""}
        >
          <FontAwesome name={"lock"} color={"#03DAC5"} size={20} />
        </InputField>
        <InputField
          placeholder="Enter your password"
          label="Confirm password"
          password={true}
          onChange={onChangeConfirmPassword}
          errorText={errorMessages.confirmPasswordError}
        >
          <FontAwesome name={"lock"} color={"#03DAC5"} size={20} />
        </InputField>
        <InputField
          placeholder="Enter your name"
          label="Name"
          onChange={onChangeName}
          errorText={errorMessages.nameError}
          checked={errorMessages.nameError === ""}
        >
          <FontAwesome name={"user-o"} color={"#03DAC5"} size={20} />
        </InputField>
        <InputField
          placeholder="Enter your surname"
          label="Surname"
          onChange={onChangeSurname}
          errorText={errorMessages.surnameError}
          checked={errorMessages.surnameError === ""}
        >
          <FontAwesome name={"user-o"} color={"#03DAC5"} size={20} />
        </InputField>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              register();
            }}
            style={[
              styles.signIn,
              {
                backgroundColor: "#03DAC5",
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#121212",
                },
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
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
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

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
