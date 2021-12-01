import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  token:string
  type:string
  id:number
  username:string
  email: string
  roles:string[]
}

export async function getId():Promise<number> {
    const user = await AsyncStorage.getItem("user")
    if(user) {
    const  a:User = JSON.parse(user)
    console.log(a.id)
      return Promise.resolve(a.id) 
  }
  return Promise.resolve(0)
  
}

export async function isLogged() {
    if (await AsyncStorage.getItem("user")) 
      return true
     else 
      return false
    
  }