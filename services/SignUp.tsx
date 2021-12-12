interface FormData {
  username: string;
  plainPassword: string;
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
        return "error"
      } else {
        return "z essa"
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
export default SignUp;
