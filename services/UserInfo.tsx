interface FormData {



  }
  export const GetUserInfo = async (id: number) => {
    try {
      const response = await fetch(
        "https://gen-gg.herokuapp.com/api/getUserInfo/"+id,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

        }
      );
      const json = await response.json()
      console.log(json)
      return json
    } catch (error) {
      console.error(error)
    }
  };

  export const UpdateUserInfo = async (id: number) => {
    try {
      const response = await fetch(
        "https://gen-gg.herokuapp.com/api/getUserInfo/"+id,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

        }
      );
      const json = await response.json()
      console.log(json)
      return json
    } catch (error) {
      console.error(error)
    }
  };
  
  