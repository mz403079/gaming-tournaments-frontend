interface FormData {
  password: string;
  email: string;
}
const SignUp = async (data: FormData) => {
  try {
    const response = await fetch(
      "https://gen-gg.herokuapp.com/api/auth/signup",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "eno",
          plainPassword: data.password,
          email: data.email,
          name: "Kuba",
          surname: "Bawoł",
        }),
      }
    );
    const json = await response.json();
  } catch (error) {
    console.error(error);
  }
};

export default SignUp;
