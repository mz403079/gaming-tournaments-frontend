interface UserData {
    userId: number
}
interface FormData {
    name: string
    tournamentStart: Date
    description?: string
    tournamentEnd: Date
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
      const response = await fetch(
        "https://gen-gg.herokuapp.com/api/auth/signup",
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
  