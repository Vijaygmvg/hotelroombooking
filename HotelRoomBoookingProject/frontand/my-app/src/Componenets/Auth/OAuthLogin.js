import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import  { AuthContext } from "./AuthProvider";



export default function OAuthLogin() {
    const location=useLocation()
   const {handleLogin}=useContext(AuthContext)
    const [message,setMessage]=useState("loading......")
    const navigate=useNavigate()

    useEffect(()=>{
    const query=new URLSearchParams(location.search)
    
    const token=query.get("token")
    if (token){
        try{
                    handleLogin(token)
       setTimeout(()=>{
        navigate("/")
       
       },3000)
    }
    catch(err){
        console.log(err)
        navigate("/login")
    }

    }
    else{
            setMessage("roorr in google login plzz try in manually ")
    }
},[location]
);
  return (
    <div>OAuthLogin
        <div>{message}</div>
    </div>
  )
}
