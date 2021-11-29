interface FormData {
  username: string;
  password: string;
  email: string;
  name: string;
  surname: string;
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
          username: data.username,
          plainPassword: data.password,
          email: data.email,
          name: data.name,
          surname: data.surname,
        }),
      }
    );
    const json = await response.json();
  } catch (error) {
    console.error(error);
  }
};

export default SignUp;
