import React from 'react'
import HeaderMain from '../LayOut/HeaderMain'
import Parallax from '../Common/Parallax'
import OurServices from '../Common/Services'
import RoomCarousel from '../Common/RoomCarousel'
import RoomSearch from '../Common/RoomSearch'
import { useLocation } from 'react-router-dom'
import m from '../Common/mario-scheibl-lpI-tGf2zCE-unsplash.jpg'

export default function Home() {
  const location=useLocation()
  const message=location.state&&location.state.message
  const currentUser=localStorage.getItem("userId")
  return (
   <section>
    {message&&<p className=" text-red-600 px-5 bg-yellow-200">{message}</p>}
    {currentUser&&(<p className="text-green">you are logged as {currentUser}</p>)}
    <HeaderMain/>
    <section  className="container mx-auto">
      <RoomSearch/>
      <RoomCarousel/>
  
      <OurServices/>
      

    </section>

   </section>
  )
}
