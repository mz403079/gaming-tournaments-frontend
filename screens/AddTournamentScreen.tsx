import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect, useState} from "react";
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
  import { InputField } from "../components/UI";
  import { AddTournament, GetId } from "../services";
  interface UserData {
    userId: number
}

const AddTournamentScreen = () => {
  function register() {
    AddTournament(data);
  }
  
  const [user, setUser] = useState({
    userId:0,
  })
  useEffect(() => {
    setUser({
      ...data,
      userId: GetId,
    });

  }, []);
  const [data, setData] = useState({
    name :"",
    tournamentStart:new Date(),
    tournamentEnd:new Date(),
    description:"",
    maxTeamSize:0,
    maxNumberOfTeams:0,
    reward:0,
    isLan:false,
    city:"",
    street:"",
    regulations:"",
    organizer:user,
  });
  const [errorMessages, setErrorMessages] = React.useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    nameError: "",
    surnameError: "",
  });
  // function validateForm() {
  //   const { username, email, password, confirmPassword, name, surname } = data;
  //   const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  //   const passwordReg = /^(?=.*[a-z])(?=.*d)(?=.*[#$^+=!*()@%&]).{8,16}$/;
  //   setErrorMessages({
  //     ...errorMessages,
  //     usernameError:
  //       username.length > 6 || username.length === 0
  //         ? ""
  //         : "Username must be minimum 6 characters",
  //     emailError:
  //       emailReg.test(email) || email.length === 0
  //         ? ""
  //         : "Email is not correct",
  //     // COMMENTED FOR SIMPLER TESTING
  //     // passwordError: passwordReg.test(password) || password.length === 0
  //     //   ? ""
  //     //   : "Minimum 1 letter,1 number,1 special character and between 8 and 16 characters",
  //     confirmPasswordError:
  //       password === confirmPassword || confirmPassword.length === 0
  //         ? ""
  //         : "Passwords do not match",
  //     nameError: name.length > 0 || name.length === 0 ? "" : "Fill your name",
  //     surnameError:
  //       surname.length > 0 || surname.length === 0 ? "" : "Fill your surname",
  //   });
  // }
  // useEffect(() => {
  //   validateForm();
  // }, [data]);

  // function onChangeUsername(val: string) {
  //   setData({
  //     ...data,
  //     username: val,
  //   });
  // }
  // function onChangeEmail(val: string) {
  //   setData({
  //     ...data,
  //     email: val,
  //   });
  // }
  // function onChangePassword(val: string) {
  //   setData({
  //     ...data,
  //     password: val,
  //   });
  // }

  // function onChangeConfirmPassword(val: string) {
  //   setData({
  //     ...data,
  //     confirmPassword: val,
  //   });
  // }
  // function onChangeName(val: string) {
  //   setData({
  //     ...data,
  //     name: val,
  //   });
  // }
  // function onChangeSurname(val: string) {
  //   setData({
  //     ...data,
  //     surname: val,
  //   });
  // }
    return (
        <View style={styles.container}>
      {/* <StatusBar backgroundColor={"#121212"} barStyle="light-content" />
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
        </InputField>
        <InputField
          placeholder="Enter your email"
          label="Email"
          onChange={onChangeEmail}
          errorText={errorMessages.emailError}
        >
        </InputField>
        <InputField
          placeholder="Enter your password"
          label="Password"
          password={true}
          onChange={onChangePassword}
          errorText={errorMessages.passwordError}
          checked={errorMessages.emailError === ""}
        >
        </InputField>
        <InputField
          placeholder="Enter your password"
          label="Confirm password"
          password={true}
          onChange={onChangeConfirmPassword}
          errorText={errorMessages.confirmPasswordError}
        >
        </InputField>
        <InputField
          placeholder="Enter your name"
          label="Name"
          onChange={onChangeName}
          errorText={errorMessages.nameError}
          checked={errorMessages.nameError === ""}
        >
        </InputField>
        <InputField
          placeholder="Enter your surname"
          label="Surname"
          onChange={onChangeSurname}
          errorText={errorMessages.surnameError}
          checked={errorMessages.surnameError === ""}
        >
        </InputField>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              addTournament();
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
        </View>
      </Animatable.View> */}
      {user}
    </View>
    );
}

export default AddTournamentScreen;

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