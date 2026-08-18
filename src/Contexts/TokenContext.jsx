import axios from "axios";
import { Children, createContext, useEffect, useState } from "react";



export let CounterContext = createContext();


export default function CounterContextProvider({ children }) {
 async function getUserData() {
 let {data}= await  axios.get('https://route-posts.routemisr.com/users/profile-data',{
      headers:{
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
    })
    setUserData(data.data.user)

  }

  const [Userdata, setUserData] = useState(null);
const [UserToken, setUserToken] = useState(null);
useEffect(()=>{
  if(localStorage.getItem('token')){
    setUserToken(localStorage.getItem('token'))
    getUserData()
   
  }
},[])
  return (
   <CounterContext.Provider value={{UserToken , setUserToken ,Userdata }}>
    {children}
   </CounterContext.Provider>
  );
}