interface game {
    gameId: number;
    name: string;
  }
  interface gameAccount {
    inGameName: string
    game: game
  }

export const AddGameAccount = async (data: gameAccount, id: number) => {
    console.log(data)
  try {
    const response = await fetch(
      "https://gen-gg.herokuapp.com/api/addGameAccount/"+id,
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
export const DeleteGameAccount = async (id: number) => {
try {
  const response = await fetch(
    "https://gen-gg.herokuapp.com/api/deleteGameAccount/"+id,
    {
      method: "DELETE",

    }
  );
  const json = await response.json();
} catch (error) {
  console.error(error);
}
};
