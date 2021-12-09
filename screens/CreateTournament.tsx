import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const CreateTournament = () => {
  const [user, setUser] = useState({
    userId: 0,
  });

  useEffect(() => {
    GetId().then(function (res) {
      setUser({
        userId: res,
      });
    });
  }, []);

  const [data, setData] = useState({
    name: "",
    tournamentStart: new Date(),
    tournamentEnd: new Date(),
    description: "",
    maxTeamSize: 0,
    maxNumberOfTeams: 0,
    reward: 0,
    isLan: false,
    city: "",
    street: "",
    regulations: "",
    organizer: user,
  });
  const [errorMessages, setErrorMessages] = React.useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    nameError: "",
    surnameError: "",
  });
  function submitForm() {
    let {tournamentEnd, tournamentStart} = data
    let stringEnd = tournamentEnd.getFullYear() + "-" + (tournamentEnd.getMonth() + 1) + "-" + tournamentEnd.getDay();
    let stringStart = tournamentStart.getFullYear() + "-" + (tournamentStart.getMonth() + 1) + "-" + tournamentStart.getDay()
    + " " + tournamentStart.getHours() + ":" + tournamentStart.getMinutes();

    AddTournament({
      name:data.name,
      description:data.description,
      maxTeamSize:data.maxTeamSize,
      maxNumberOfTeams:data.maxNumberOfTeams,
      reward:data.reward,
      isLan:data.isLan,
      city:data.city,
      street:data.street,
      regulations:data.regulations,
      organizer:user,
      tournamentStart:stringStart,
      tournamentEnd:stringEnd,
    })
  }
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
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const onChangeTournamentStart = (event, selectedDate) => {
    console.log(data.tournamentStart)
    const currentDate = selectedDate || date;
    setShowStartDate(Platform.OS === "ios");
    setData({
      ...data,
      tournamentStart: currentDate,
    });
  };
  const onChangeTournamentEnd = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowEndDate(Platform.OS === "ios");
    setData({
      ...data,
      tournamentEnd: currentDate,
    });
  };

  const showDatepickerStart = () => {
    setShowStartDate(true);
    setMode('date');
  };
  const showDatepickerEnd = () => {
    setShowEndDate(true);
    setMode('date');
  };
  const showTimer = () => {
    setShowStartDate(true);
    setMode('time');
  };
  function onChangeName(val: string) {
    setData({
      ...data,
      name: val,
    });
  }

  function onChangeDescription(val: string) {
    setData({
      ...data,
      description: val,
    });
  }
  function onChangeMaxTeamSize(val: number) {
    setData({
      ...data,
      maxTeamSize: val,
    });
  }
  function onChangeMaxNumberOfTeams(val: number) {
    setData({
      ...data,
      maxNumberOfTeams: val,
    });
  }
  function onChangeReward(val: number) {
    setData({
      ...data,
      reward: val,
    });
  }
  function onChangeIsLan(val: boolean) {
    setData({
      ...data,
      isLan: val,
    });
  }
  function onChangeCity(val: string) {
    setData({
      ...data,
      city: val,
    });
  }
  function onChangeStreet(val: string) {
    setData({
      ...data,
      street: val,
    });
  }
  function onChangeRegulations(val: string) {
    setData({
      ...data,
      regulations: val,
    });
  }
  function formatDate(val: Date) {
    var day = val.getDate();
    var month = val.getMonth() + 1;
    var year = val.getFullYear();
    return day + "-" + month + "-" + year;
  }
  
  function formatHour(val: Date) {
    var hour = val.getHours();
    var minutes = val.getMinutes();
    return hour + ":" + ("0" + minutes).slice(-2);
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#121212"} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Create tournament!</Text>
      </View>

      <Animatable.View animation={"fadeInUpBig"} style={styles.footer}>
        <ScrollView>
          <InputField
            placeholder="Enter tournament name"
            label="Name"
            onChange={onChangeName}
          ></InputField>

          <InputField
            onFocus={showDatepickerStart}
            placeholder="Enter tournament date"
            label="Tournament start"
            value={formatDate(data.tournamentStart)}
            editable={false}
            selectTextOnFocus={false}
          >
            <FontAwesome
              name={"calendar-check-o"}
              onPress={showDatepickerStart}
              color={"#03DAC5"}
              size={20}
            />
          </InputField>
          <InputField
            onFocus={showTimer}
            placeholder="Enter tournament starting hour"
            label="Tournament starting hour"
            value={formatHour(data.tournamentStart)}
            editable={false}
            selectTextOnFocus={false}
          >
            <FontAwesome
              name={"calendar-check-o"}
              onPress={showTimer}
              color={"#03DAC5"}
              size={20}
            />
          </InputField>
          {showStartDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChangeTournamentStart}
            />
          )}

          <InputField
            onFocus={showDatepickerEnd}
            placeholder="Enter tournament end date"
            label="Tournament end"
            value={formatDate(data.tournamentEnd)}
            editable={false}
            selectTextOnFocus={false}
          >
            <FontAwesome
              name={"calendar-check-o"}
              onPress={showDatepickerEnd}
              color={"#03DAC5"}
              size={20}
            />
          </InputField>
          {showEndDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChangeTournamentEnd}
            />
          )}
          <InputField
            placeholder="Description"
            label="Description"
            onChange={onChangeDescription}
          ></InputField>
          <InputField
            placeholder="Maximum team size"
            label="Team size"
            keyboardType="number-pad"
            onChange={onChangeMaxTeamSize}
          ></InputField>
          <InputField
            placeholder="Maximum number of teams"
            label="Team limit"
            keyboardType="number-pad"
            onChange={onChangeMaxTeamSize}
          ></InputField>
          <InputField
            placeholder="City"
            label="City"
            onChange={onChangeCity}
          ></InputField>
          <InputField
            placeholder="Street"
            label="Street"
            onChange={onChangeStreet}
          ></InputField>
          <InputField
            placeholder="Rules"
            label="Rules"
            onChange={onChangeRegulations}
          ></InputField>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={submitForm}
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
                Add tournament
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default CreateTournament;

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
