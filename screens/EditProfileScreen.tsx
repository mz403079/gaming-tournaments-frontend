import React, { useRef, useState, useEffect } from "react";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../assets/colors/colors";
import { UIImagePickerPresentationStyle } from "expo-image-picker/build/ImagePicker.types";
import { UpdateUserInfo, GetId } from "../services";
import { InputField } from "../components/UI";
import { getId } from "../services/User";
interface Contact {
  phoneNumber: string;
  discordName: string;
}
interface User {
  name: string;
  surname: string;
  email: string;
  contact: Contact;
}
const EditProfileScreen = () => {
  const [user, setUser] = useState<User>({
    name: "",
    surname: "",
    email: "",
    contact: {
      phoneNumber: "",
      discordName: "",
    },
  });
  const [userId, setUserId] = useState<number>(0);
  const [isLoading, setLoading] = useState(false);
  const tournamentsURL = 'https://gen-gg.herokuapp.com/api/getUserInfo/';
  let getTournaments = () => {
    getId().then((res) => fetch(tournamentsURL+res))
        .then((response) => response.json())
        .then((json) => setUser(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))
    }

  useEffect(() => {
    setLoading(true);
    getId().then((res) => setUserId(res))
    getTournaments()
  }, []);

  const image =
    "https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec";
  const [pickedImage, setPickedImage] = React.useState(image);
  const _bs = useRef<BottomSheet>(null);
  const _fall = new Animated.Value(1);

  const takePhotoFromCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true });

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImage(result.uri);
      // @ts-ignore
      _bs.current.snapTo(1);
      console.log(result.uri);
    }
  };

  const choosePhotoFromLibrary = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImage(result.uri);
      // @ts-ignore
      _bs.current.snapTo(1);
      console.log(result.uri);
    }
  };
  function onChangeEmail(val: string) {
    setUser({
      ...user,
      email: val,
    });
  }
  function onChangePhone(val: string) {
    setUser({
      ...user,
      contact: {
        ...user.contact,
        phoneNumber: val,
      },
    });
  }
  function onChangeDiscord(val: string) {
    setUser({
      ...user,
      contact: {
        ...user.contact,
        discordName: val,
      },
    });
  }
  function onChangeName(val: string) {
    setUser({
      ...user,
      name: val,
    });
  }
  function onChangeSurname(val: string) {
    setUser({
      ...user,
      surname: val,
    });
  }
  const _renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}
      >
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}
      >
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        // @ts-ignore
        onPress={() => _bs.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const _renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
  if (isLoading) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212'}}>
            <ActivityIndicator size={"large"}/>
        </View>
    );
}
  return (
    <View style={styles.container}>
      <BottomSheet
        // @ts-ignore
        ref={_bs}
        snapPoints={[330, 0]}
        initialSnap={1}
        callbackNode={_fall}
        renderContent={_renderInner}
        renderHeader={_renderHeader}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.3, Animated.multiply(_fall, 1.0)),
        }}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            // @ts-ignore
            onPress={() => _bs.current.snapTo(0)}
          >
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{
                  uri: pickedImage,
                }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 100 / 2 }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="camera"
                    size={30}
                    color={"#fff"}
                    style={{
                      opacity: 0.7,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Jan Kowalski
          </Text>
        </View>

        <InputField placeholder="name" value={user ? user.name : "" } onChange={onChangeName}>
          <FontAwesome name="user-o" color={colors.primary} size={20} />
        </InputField>

        <InputField placeholder="surname" value={user ? user.surname : "" } onChange={onChangeSurname}>
          <FontAwesome name="user-o" color={colors.primary} size={20} />
        </InputField>

        <InputField
          placeholder="666 555 4444"
          value={user?.contact?.phoneNumber}
          onChange={onChangePhone}
        >
          <Feather name="phone" color={colors.primary} size={20} />
        </InputField>

        <InputField
          placeholder="email"
          onChange={onChangeEmail}
          value={user ? user.email : "" }
          keyboardType="email-address"
        >
          <FontAwesome name="envelope-o" color={colors.primary} size={20} />
        </InputField>
        <InputField placeholder="discord" value={user.contact ? user.contact.discordName : "" } onChange={onChangeDiscord}>
          <FontAwesome name="user-o" color={colors.primary} size={20} />
        </InputField>
        {/*<View style={styles.action}>*/}
        {/*    <FontAwesome name="globe" color={colors.text} size={20} />*/}
        {/*    <TextInput*/}
        {/*        placeholder="Country"*/}
        {/*        placeholderTextColor="#666666"*/}
        {/*        autoCorrect={false}*/}
        {/*        style={[*/}
        {/*            styles.textInput,*/}
        {/*            {*/}
        {/*                color: colors.text,*/}
        {/*            },*/}
        {/*        ]}*/}
        {/*    />*/}
        {/*</View>*/}

        {/*<View style={styles.action}>*/}
        {/*    <Icon name="map-marker-outline" color={colors.text} size={20} />*/}
        {/*    <TextInput*/}
        {/*        placeholder="City"*/}
        {/*        placeholderTextColor="#666666"*/}
        {/*        autoCorrect={false}*/}
        {/*        style={[*/}
        {/*            styles.textInput,*/}
        {/*            {*/}
        {/*                color: colors.text,*/}
        {/*            },*/}
        {/*        ]}*/}
        {/*    />*/}
        {/*</View>*/}

        <TouchableOpacity
          style={styles.commandButton}
          onPress={() => UpdateUserInfo(user, userId)}
        >
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#03DAC5",
    alignItems: "center",
    marginTop: 50,
  },
  panel: {
    padding: 20,
    backgroundColor: "#303030",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#303030",
    shadowColor: "#121212",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 100,
    height: 5,
    borderRadius: 4,
    backgroundColor: "#C4C4C4",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    color: "#fff",
  },
  panelSubtitle: {
    fontSize: 14,
    color: "#cbcbcb",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#03DAC5",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#303030",
  },
  action: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
