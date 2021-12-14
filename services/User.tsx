import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  token:string
  type:string
  id:number
  username:string
  email: string
  roles:string[]
  name: string
  surname: string
}

export async function getId():Promise<number> {
    const user = await AsyncStorage.getItem("user")
    if(user) {
    const  a:User = JSON.parse(user)
    return Promise.resolve(a.id) 
  }
  return Promise.resolve(0)
}

export async function getUsername():Promise<string> {
    const user = await AsyncStorage.getItem("user")
    if(user) {
        const  a:User = JSON.parse(user)
        return Promise.resolve(a.username)
    }
    return Promise.resolve("")
}

export async function getName():Promise<string> {
    const user = await AsyncStorage.getItem("user")
    if(user) {
        const  a:User = JSON.parse(user)
        return Promise.resolve(a.name)
    }
    return Promise.resolve("")
}

export async function getSurname():Promise<string> {
    const user = await AsyncStorage.getItem("user")
    if(user) {
        const  a:User = JSON.parse(user)
        return Promise.resolve(a.surname)
    }
    return Promise.resolve("")
}

export async function getEmail():Promise<string> {
    const user = await AsyncStorage.getItem("user")
    if(user) {
        const  a:User = JSON.parse(user)
        return Promise.resolve(a.email)
    }
    return Promise.resolve("")
}


export async function isLogged() {
    if (await AsyncStorage.getItem("user")) 
      return true
     else 
      return false
    
  }