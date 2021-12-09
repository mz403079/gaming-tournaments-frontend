import AsyncStorage from "@react-native-async-storage/async-storage";

interface FormData {
  username: string;
  plainPassword: string;
}
const SignInRequest = async (data: FormData) => {
  fetch('https://gen-gg.herokuapp.com/api/auth/signin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(
   data
  ),
})
.then(response => response.json())
.then(async data => {
  if(data.status && data.status !== 200) {
  }
  else {
      await AsyncStorage.setItem("user", JSON.stringify(data))
  }

})
.catch((error) => {
  console.error('Error:', error);
});
};

export default SignInRequest;
