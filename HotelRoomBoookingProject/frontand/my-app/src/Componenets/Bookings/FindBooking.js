import React from 'react'
import { useState } from 'react'
import { cancelBooking, getBookingByConfirmationCode } from '../Utils/ApiFunctions'

export default function FindBooking() {
   const [confirmationCode,setConfirmationCode]=useState("")
   const [error,setError]=useState("")
   const [isLoading,setIsLoading]=useState(true)
   const [isDeleted,setIsDeleted]=useState(false)
   const[successMessage,setSuccessMessage]=useState("")
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

   const handleInputChange=(e)=>{
    setConfirmationCode(e.target.value)

   }
   const handleFormSubmit=async (e)=>{
    e.preventDefault();
    setIsLoading(true)
    try{
       const data=await getBookingByConfirmationCode(confirmationCode);
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
const handleBookingCancellation=async ()=>{
    try{
        await cancelBooking(bookingInfo.bookingId)
        setIsDeleted(true)
        setSuccessMessage("booking has been cancelled successsfully ")
        setBookingInfo(emptyBookingInfo)
        setConfirmationCode("")
        setError("")
    }
    catch(err){

           setError(err.message)

    }
    setTimeout(()=>{
      setSuccessMessage("")
      setIsDeleted(false)
    },3000)
}


  return (
    <div>
        <div className="container mt-5 flex flex-col justify-center items-center">
            <h2>Find my Bookings</h2>
            <form onSubmit={handleFormSubmit} className="col-md-6">
                <div className='mb-3'>
                    <input type="text" className="bg-blue-200" id="cofirmationCode" name="confirmationCode" value={confirmationCode} onChange={handleInputChange} placeholder='enter the boooking confimatiioncode ' />
                    <button className="bg-green-600 ">find booking </button>
                </div>
            </form>
            {isLoading?(<div>
                finding booking 
                </div>
            ):error?(
                <div className="text-red-500">{error}</div>
            ):bookingInfo.bookingConfirmationCode?(
                <div className=" w-full md:w-1/2 mb-4 mt-4 ">
                    <h3>BoookingInformation</h3>
                    <p>Booking confirmationcoee:{bookingInfo.bookingConfirmationCode}</p>
                     <p>Booking Id:{bookingInfo.bookingId}</p>
                     <p>Booking Id:{bookingInfo.bookingId}</p>
                     <p>RoomNumber:{bookingInfo.room.id}</p>
                     <p >Check-In-Date:{bookingInfo.checkInDate}</p>
                  <p >Check-Out-Date:{bookingInfo.checkOutDate}</p>
                  <p >GuestfullName:{bookingInfo.guestFullName}</p>
                  <p >GuestEmail:{bookingInfo.guestEmail}</p>
                  <p >NoOfAdults:{bookingInfo.noOfAdults}</p>
                  <p >NoOfCHildrens:{bookingInfo.noOfChildrens}</p>
                  <p>TotalNoOfGuest:{bookingInfo.totalNoOfGuest}</p>
                  <p>BookingConfirmationCOde :{bookingInfo.bookingConfirmationCode}</p>
                  {
                    !isDeleted&&(
                        <button
                        className="text-black bg-red-500"
                        onClick={()=>handleBookingCancellation(bookingInfo.bookingId)}>
                            calcel Booking 
                        </button>
                    )
                  }

                </div>
            ):(
                <div>
                    find booking...
                    </div>
            )}
            {isDeleted&&(
                <div className='alert alert-success mt-3' role="alert">
                   {successMessage}
                </div>
            )}
        </div>
    </div>
  )
}
