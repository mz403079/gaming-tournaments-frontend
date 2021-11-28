import AsyncStorage from "@react-native-async-storage/async-storage";

interface FormData {
  password: string;
  username: string;
  onSuccess: (...args: any[]) => void;
}
const SignInRequest = async (data: FormData) => {
  fetch('https://gen-gg.herokuapp.com/api/auth/signin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: data.username,
    plainPassword: data.password,
  }),
})
.then(response => response.json())
.then(async data => {
  if(data.status && data.status !== 200) {
    console.log("error")
  }
  else {
    console.log("z essą")
      await AsyncStorage.setItem("user", JSON.stringify(data))
      console.log(data.onSuccess)
      data.onSuccess()

  }

})
.catch((error) => {
  console.error('Error:', error);
});
};

export default SignInRequest;
