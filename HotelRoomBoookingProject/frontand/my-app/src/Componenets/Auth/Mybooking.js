import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBookingByUserId } from '../Utils/ApiFunctions'
import { getUser } from '../Utils/ApiFunctions'
import moment from 'moment'
export default function Mybooking() {
    
       const[errorMessage,setErrorMessage]=useState("")
       const[user,setUser]=useState({
        id:"",
        email:"",
        firstName:"",
        lastName:"",
        roles:[{id:"",name:""}]
       
    })
    
    const [bookings, setBookings] = useState([
        {
            id: "",
            room: { id: "", roomType: "" },
            checkInDate: "",
            checkOutDate: "",
            bookingConfirmationCode: ""
        }
    ])
    const [message,setMessage]=useState("")
    const navigate = useNavigate()
    
        const userId = localStorage.getItem("userId")
        const token = localStorage.getItem("token")
       const bookingStatus=(startDate,endDate)=>{
        console.log(moment(endDate))
        console.log(moment(Date.now()))
   
        if(!moment(endDate).isBefore(Date.now()))
          return "on-going"
        else 
        return "completed"

       }
        
       useEffect(()=>{
    
        const fetchUser=async ()=>{
           try{
            const response=await getUser(userId,token)
            setUser(response)
    
           }
           catch(err){
            console.log(err)
    
          }
       }
       fetchUser()
       },[userId])
       useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookingByUserId(userId, token)
                console.log(userId+ token+response)
                setBookings(response)
            } catch (error) {
                console.error("Error fetching bookings:", error.message)
                setErrorMessage(error.message)
            }
        }
    
        fetchBookings()
    }, [userId])
    
  return (
    <div> <h4 className="text-center text-xl font-semibold mb-4">Booking History</h4>
    
          {bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg shadow">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="px-4 py-2">Booking ID</th>
                    <th className="px-4 py-2">Room ID</th>
                    <th className="px-4 py-2">Room Type</th>
                    <th className="px-4 py-2">Check In Date</th>
                    <th className="px-4 py-2">Check Out Date</th>
                    <th className="px-4 py-2">Confirmation Code</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{booking.bookingId}</td>
                      <td className="px-4 py-2">{booking.room.id}</td>
                      <td className="px-4 py-2">{booking.room.roomType}</td>
                      <td className="px-4 py-2">
                        {moment(booking.checkInDate).format("MMM Do, YYYY")}
                      </td>
                      <td className="px-4 py-2">
                        {moment(booking.checkOutDate).format("MMM Do, YYYY")}
                      </td>
                      <td className="px-4 py-2">{booking.bookingConfirmationCode}</td>
                      <td className="px-4 py-2 text-green-600">{bookingStatus(booking.checkInDate,moment(booking.checkOutDate).subtract(1, "month").format("MMM Do, YYYY"))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-600">You have not made any bookings yet.</p>
          )}
    </div>
  )
}
