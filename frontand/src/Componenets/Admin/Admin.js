import React from 'react'
import { Link } from 'react-router-dom'

const Admin=()=> {
  return (
    <div>
        <h2>
        welcome to admin panel 
        </h2>
        <Link to="/existing-rooms">
        Manage roms 
        </Link>
        <Link to="/existing-bookings">
        Manage  Bookings 
        </Link>
    </div>
  )
}

export default Admin