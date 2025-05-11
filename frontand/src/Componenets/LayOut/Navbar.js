import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Auth/Logout';
import { AuthContext } from '../Auth/AuthProvider';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const[showOpen,setShowOpen]=useState(false)
  const {user}=useContext(AuthContext)
  const isLoggedin=user!==null;
  const userRole=localStorage.getItem("userRole")



  return (
    <>
      <nav className="bg-gradient-to-r from-blue-800 to-yellow-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-white font-bold text-xl">HotelEase</span>
            </div>

            {/* Menu toggle (mobile) */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none"
              >
                {isOpen ? '✖' : '☰'}
              </button>
            </div>

            {/* Navigation Links */}
            <div className={`md:flex items-center space-x-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
              <Link to="/" className="text-white hover:text-yellow-300 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/add-room" className="text-white hover:text-yellow-300 px-3 py-2 text-sm font-medium">
                Add Room
              </Link>
              <Link to="/existing-rooms" className="text-white hover:text-yellow-300 px-3 py-2 text-sm font-medium">
                Rooms
              </Link>
              <Link to="/myBooking" className="text-white hover:text-yellow-300 px-3 py-2 text-sm font-medium">find My Booking</Link>
              {isLoggedin&&userRole&&userRole.indexOf("ROLE_ADMIN")!==-1&&( <Link to="/admin" className="text-white hover:text-yellow-300 px-3 py-2 text-sm font-medium">
                admin
              </Link>)}
             
              
              <button onClick={()=>{alert(showOpen);setShowOpen(!showOpen)}}>show</button>
             { showOpen?<Logout/>:null  
}
                
              {/* Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className="text-white hover:text-yellow-300 px-3 py-2 text-sm font-medium"
                >
                  Account
                </button>
                {isAccountOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-20">
                    <ul className="flex flex-col">
                      {isLoggedin?( <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">Logout</li>):( <><li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">Sign In</li>
                      <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer" ><Link to="/login">Login</Link></li></>
                     )}
                     
                     
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div>
        hello
      </div>
    </>
  );
}
