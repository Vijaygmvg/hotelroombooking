import React, { createContext, useState } from 'react'
import {jwtDecode} from "jwt-decode"


export const AuthContext=createContext({
    user:null,
    handleLogin:(token)=>{},
    handleLogOut:()=>{}
})
function AuthProvider({children}) {
  const [user,setUser]=useState()
  const handleLogin=(token)=>{
    alert("handling login")
  const decodeToken=jwtDecode(token);

  localStorage.setItem("userId",decodeToken.sub)
  localStorage.setItem("userRole",decodeToken.roles)
  localStorage.setItem("token",token)
  alert(localStorage.getItem("userId"))
  setUser(decodeToken)
  }
  const handleLogout=()=>{

    
    localStorage.removeItem("userId")
    localStorage.removeItem("userRole")
    localStorage.removeItem("token")
    setUser(null)
    }

  return (
   <AuthContext.Provider value={{user,handleLogin,handleLogout}}>
    {children}

   </AuthContext.Provider>
  )
}

export default AuthProvider