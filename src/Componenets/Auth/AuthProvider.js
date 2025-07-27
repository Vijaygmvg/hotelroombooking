import React, { createContext, useState } from 'react'
import {jwtDecode} from "jwt-decode"
import { useEffect } from 'react'

export const AuthContext=createContext({
    user:null,
    handleLogin:(token)=>{},
   handleLogout:()=>{}
    
})

function AuthProvider({children}) {
  const [user,setUser]=useState(null)
  const handleLogin=(token)=>{
   
  const decodeToken=jwtDecode(token);

  localStorage.setItem("userId",decodeToken.sub)
  localStorage.setItem("userRole",decodeToken.roles)
  localStorage.setItem("token",token)
  
  setUser(decodeToken)
  }
  const handleLogout=()=>{

    
    localStorage.removeItem("userId")
    localStorage.removeItem("userRole")
    localStorage.removeItem("token")
    setUser(null)
    }
    
  useEffect(() => {
    // Update user state from localStorage on initial render
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
   <AuthContext.Provider value={{user,handleLogin,handleLogout}}>
    {children}

   </AuthContext.Provider>
  )
}

export default AuthProvider