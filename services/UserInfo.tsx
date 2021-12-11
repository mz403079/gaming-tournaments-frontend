interface Contact {
  phoneNumber: string;
  discordName: string;
}
interface FormData {
  name: string;
  surname: string;
  email: string;
  contact: Contact;
}

  export const UpdateUserInfo = async (user: FormData, id: number) => {
    try {
      const response = await fetch(
        "https://gen-gg.herokuapp.com/api/updateUser/"+id,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            user
           ),
        }
      );
      
      const json = await response.json()
      if(response.status && response.status !== 200) {
        console.log("ERROR")
      }
      console.log(response)
      return json
    } catch (error) {
      console.error(error)
    }
  };
  
  