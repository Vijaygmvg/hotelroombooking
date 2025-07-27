import React from 'react'
import { getBookingByConfirmationCode } from '../Utils/ApiFunctions'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function ShowBooking() {
    const [confirmationCode,setConfirmationCode]=useState("")
       const [error,setError]=useState("")
       const [isLoading,setIsLoading]=useState(true)
       const navigate=useNavigate()
      
       const [bookingInfo,setBookingInfo]=useState({
        bookingId:"",
        room:{id:""},
        bookingConfirmationCode:"",
        roomNumber:"",
        checkInDate:"",
        checkOutDate:"",
        guestFullName:"",
        guestEmail:"",
        noOfAdults:"",
        noOfChildrens:"",
        totalNoOfGuest:""
    
       })
       const emptyBookingInfo={
        bookingId:"",
        room:{id:""},
        bookingConfirmationCode:"",
        roomNumber:"",
        checkInDate:"",
        checkOutDate:"",
        guestFullName:"",
        guestEmail:"",
        noOfAdults:"",
        noOfChildrens:"",
        totalNoOfGuest:""
    
       }
       const location=useLocation()
       
    
       
      useEffect(()=>async ()=>{
      
       const query=new URLSearchParams(location.search)
       const code=query.get("confirmationCode")
       setConfirmationCode(code)
            alert("code is "+code)
        setIsLoading(true)
        if(code){

        try{
           const data=await getBookingByConfirmationCode(code);
           if(data){
           console.log(data)
           setBookingInfo(data)
           }
           else{
            setBookingInfo(emptyBookingInfo)
            alert("errrrr")
           }
           
        }
        catch(err){
            
           setBookingInfo(emptyBookingInfo)
           console.log("frontad "+err.message)
            setError(err.message)
    }
      setTimeout(()=>{
        setIsLoading(false)
       },3000)
       }
       else{
         alert("unauthorized axis ")
        navigate("/login")
        window.location.reload()
       }
    }
       ,[location])

  return (
    <>
    {isLoading?(<div>
                finding booking 
                </div>
            ):error?(
                <div className="text-red-500">{error}</div>
            ):bookingInfo.bookingConfirmationCode?(
                <div className="w-full md:w-1/2 mb-6 mt-6 p-6 bg-white shadow-lg rounded-2xl border border-blue-200">
  <h3 className="text-2xl font-bold text-blue-700 mb-4 border-b pb-2">Booking Information</h3>

  <div className="space-y-2 text-gray-800 text-base">
    <p><span className="font-semibold text-blue-600">Confirmation Code:</span> {bookingInfo.bookingConfirmationCode}</p>
    <p><span className="font-semibold text-blue-600">Booking ID:</span> {bookingInfo.bookingId}</p>
    <p><span className="font-semibold text-blue-600">Room Number:</span> {bookingInfo.room?.id}</p>
    <p><span className="font-semibold text-blue-600">Check-In Date:</span> {bookingInfo.checkInDate}</p>
    <p><span className="font-semibold text-blue-600">Check-Out Date:</span> {bookingInfo.checkOutDate}</p>
    <p><span className="font-semibold text-blue-600">Guest Full Name:</span> {bookingInfo.guestFullName}</p>
    <p><span className="font-semibold text-blue-600">Guest Email:</span> {bookingInfo.guestEmail}</p>
    <p><span className="font-semibold text-blue-600">No. of Adults:</span> {bookingInfo.noOfAdults}</p>
    <p><span className="font-semibold text-blue-600">No. of Children:</span> {bookingInfo.noOfChildrens}</p>
    <p><span className="font-semibold text-blue-600">Total No. of Guests:</span> {bookingInfo.totalNoOfGuest}</p>
  </div>
</div>

            ):(
                <div>
                    find booking...
                    </div>
            )}
          </>
  )
}

export default ShowBooking