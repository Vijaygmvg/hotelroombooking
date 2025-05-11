import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Logout() {
    const navigate=useNavigate()
    const auth=useContext(AuthContext)
    const handleLogout=()=>{
        auth.handleLogout()
       
        navigate("/",{state:{message:"you have been loged out "}})

    }
    const isLoggedIn=auth.user!==null
  return isLoggedIn? (
    <>
     <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-20">
                    <ul className="flex flex-col">
                      <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer"> <Link to={"/profile"}> 
      profile 
      </Link></li>
                      <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer"> <button onClick={handleLogout}>
            logout 
        </button></li>

                    </ul>
                  </div>
   
    
    </>
  ):null
}

export default Logout