interface FormData {
  username: string;
  password: string;
  email: string;
  name: string;
  surname: string;
}
const SignUp = async (data: FormData) => {
  fetch("https://gen-gg.herokuapp.com/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(async (data) => {
      if (data.status && data.status !== 200) {
        console.log("error");
      } else {
        console.log("z essą");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
export default SignUp;
