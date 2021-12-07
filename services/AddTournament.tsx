interface UserData {
    userId: number
}
interface FormData {
    name: string
    tournamentStart: string
    description?: string
    tournamentEnd: string
    maxTeamSize: number
    maxNumberOfTeams: number
    reward: number
    isLan: boolean
    city: string
    street: string
    regulations: string
    organizer: UserData


  }
  const AddTournament = async (data: FormData) => {
    try {
      console.log("addin")
      const response = await fetch(
        "https://gen-gg.herokuapp.com/api/addTournament",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const json = await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  
  export default AddTournament;
  