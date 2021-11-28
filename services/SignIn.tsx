import AsyncStorage from "@react-native-async-storage/async-storage";

interface FormData {
  password: string;
  username: string;
}
const SignIn = async (data: FormData) => {
  try {
    const response = await fetch(
      "https://gen-gg.herokuapp.com/api/auth/signin",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          plainPassword: data.password,
        }),
      }
    );
    const json = await response.json();
    await AsyncStorage.setItem("user", JSON.stringify(json));
    console.log(await AsyncStorage.getItem("user"));
  } catch (error) {
    console.error(error);
  }
};

export default SignIn;
