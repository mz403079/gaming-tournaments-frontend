interface tournamentData {
    tournamentId: number | undefined
}
interface FormData {
    teamName: string
    tournament: tournamentData
    players: string[]
  }
  
  const AddTournament = async (data: FormData) => {
      console.log(data)
    try {
      const response = await fetch(
        "https://gen-gg.herokuapp.com/api/addTeam",
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
      if(json.message)
        return json.message
    } catch (error) {
      console.error(error);
    }
  };
  
  export default AddTournament;
  