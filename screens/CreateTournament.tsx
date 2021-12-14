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
    nameError: "",
    maxTeamSizeError: "",
    maxNumberOfTeamsError: "",
    rewardError: "",
    cityError: "",
    streetError: "",
    tournamentStartError: "",
    tournamentEndError: "",
    apiError: "",
  });
  const [coordinates, setCoordinates] = React.useState()
  const [statusApi, setStatusApi] = React.useState()
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  function submitForm() {
    let {tournamentEnd, tournamentStart} = data;
    let stringEnd =
        tournamentEnd.getFullYear() +
        "-" +
        (tournamentEnd.getMonth() + 1) +
        "-" +
        tournamentEnd.getDate();
    let stringStart =
        tournamentStart.getFullYear() +
        "-" +
        (tournamentStart.getMonth() + 1) +
        "-" +
        tournamentStart.getDate() +
        " " +
        tournamentStart.getHours() +
        ":" +
        tournamentStart.getMinutes();
    let address = data.city + ' ' + data.street
    console.log(tournamentEnd)
    console.log(tournamentStart)
    console.log("indor",stringEnd)
    console.log(stringStart)
    console.log("LATITUDE", latitude)
    console.log("LONGITUDE", longitude)
    AddTournament({
      name: data.name,
      description: data.description,
      maxTeamSize: data.maxTeamSize,
      maxNumberOfTeams: data.maxNumberOfTeams,
      reward: data.reward,
      isLan: data.isLan,
      city: data.city,
      street: data.street,
      regulations: data.regulations,
      organizer: user,
      tournamentStart: stringStart,
      tournamentEnd: stringEnd,
      lat: latitude,
      lng: longitude,
    })
  }
  function validateForm() {
    const {
      name,
      maxTeamSize,
      maxNumberOfTeams,
      tournamentStart,
      tournamentEnd,
      reward,
      isLan,
      city,
      street,
      regulations,
    } = data;

    setErrorMessages({
      ...errorMessages,
      nameError: name.length > 0 ? "" : "This field is required",
      maxTeamSizeError:
        maxTeamSize > 0 ? "" : "Teams must consist of at least one player",
      maxNumberOfTeamsError:
        maxNumberOfTeams > 1 ? "" : "At least two team slots are required",
      rewardError:
        reward >= 0 ? "" : "Add some reward",
      cityError: city.length > 0 ? "" : "This field is required",
      tournamentEndError:
        tournamentEnd >= tournamentStart ? "" : "Tournament end must come after tournament start",
      tournamentStartError:
        tournamentStart >= new Date() ? "" : "Tournament can't take place in the past",
      streetError: street.length > 0 ? "" : "This field is required",
      apiError: statusApi == "OK" ? "": "Incorrect address"
    });
  }
  function parseJson(response: any){
    console.log("RESPONSE ", response)
    setCoordinates(response.results.geometry.location)
    setStatusApi(response.status)
  }
  useEffect(() => {
    validateForm();
  }, [data]);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const onChangeTournamentStart = (event, selectedDate) => {
    console.log(data.tournamentStart);
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
    setMode("date");
  };
  const showDatepickerEnd = () => {
    setShowEndDate(true);
    setMode("date");
  };
  const showTimer = () => {
    setShowStartDate(true);
    setMode("time");
  };
  function onChangeName(val: string) {
    setData({
      ...data,
      name: val,
    });
  }
  function formatDate(val: Date) {
    var day = val.getDate();
    var month = val.getMonth() + 1;
    var year = val.getFullYear();
    return day + "-" + month + "-" + year;
  }
  async function getCoordinates(address: string)  {

    const encodedAddress = encodeURI(address)
    console.log(encodedAddress)
    // fetches data from our api
    await fetch(`https://google-maps-geocoding.p.rapidapi.com/geocode/json?language=pl&address=${encodedAddress}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
        "x-rapidapi-key": "niema"
      }
    })
        .then(response => response.json())
        .then(response => {
          setLatitude(response.results[0].geometry.location.lat)
          setLongitude(response.results[0].geometry.location.lng)
        })
        .catch(err => console.log(err))
  }

  function formatHour(val: Date) {
    var hour = val.getHours();
    var minutes = val.getMinutes();
    return hour + ":" + ("0" + minutes).slice(-2);
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
            errorText={errorMessages.nameError}
            checked={errorMessages.nameError === ""}
          ></InputField>

          <InputField
            onFocus={showDatepickerStart}
            placeholder="Enter tournament date"
            label="Tournament start"
            value={formatDate(data.tournamentStart)}
            editable={false}
            selectTextOnFocus={false}
            errorText={errorMessages.tournamentStartError}
            checked={errorMessages.tournamentStartError === ""}
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
            errorText={errorMessages.tournamentEndError}
            checked={errorMessages.tournamentEndError === ""}
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
          />
          <InputField
            placeholder="Maximum team size"
            label="Team size"
            keyboardType="number-pad"
            onChange={onChangeMaxTeamSize}
            errorText={errorMessages.maxTeamSizeError}
            checked={errorMessages.maxTeamSizeError === ""}
          />
          <InputField
            placeholder="Maximum number of teams"
            label="Team limit"
            keyboardType="number-pad"
            onChange={onChangeMaxNumberOfTeams}
            errorText={errorMessages.maxNumberOfTeamsError}
            checked={errorMessages.maxNumberOfTeamsError === ""}
          />
          <InputField
            placeholder="5 crowns"
            label="Winner's prize"
            keyboardType="number-pad"
            onChange={onChangeReward}
            errorText={errorMessages.rewardError}
            checked={errorMessages.rewardError === ""}
          />
          <InputField
            placeholder="City"
            label="City"
            onChange={onChangeCity}
            onPressOut={() => {getCoordinates(data.city + ' ' + data.street)}}
            errorText={errorMessages.cityError}
            checked={errorMessages.cityError === ""}
          />
          <InputField
            placeholder="Street"
            label="Street"
            onChange={onChangeStreet}
            errorText={errorMessages.apiError}
            checked={errorMessages.streetError === ""}
          />
          <InputField
            placeholder="Rules"
            label="Rules"
            onChange={onChangeRegulations}
          />
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
