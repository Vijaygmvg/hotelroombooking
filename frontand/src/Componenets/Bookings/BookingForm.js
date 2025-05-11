import React, { useEffect, useState } from 'react'
import { bookRoom, getRoomById } from '../Utils/ApiFunctions'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import { CalendarDays, User, Mail, Users, Baby, CheckCircle2 } from 'lucide-react';
import BookingSummary from './BookingSummary';

export default function BookingForm() {

    const[isValidated,setIsValidated]=useState(false)
    const[isSubmitted,setIsSubMitted]=useState(false)
    const[errorMessage,setErrorMessage]=useState("")
     const[roomPrice,setRoomPrice]=useState(0)
     const [booking,setBooking]=useState({
        guestFullName:"",
        guestEmail:"",
        guestFullName:"",
        checkInDate:"",
        checkOutDate:"", 
        noOfAdults:"",
        noOfChildrens:"",
       

     }

     )
     const navigate=useNavigate()
     const handleInputChange=(e)=>{
            
        const {name,value}=e.target
        setBooking({...booking,[name]:value})
        
        setErrorMessage("")


     }

     const [roomInfo,setRoomInfo]=useState({
        photo:"",
        roomType:"",
        roomPrice:"",

     })
     const{roomId}=useParams()

     const getRoomPriceById=async (roomId)=>{
        try{
             const response=await getRoomById(roomId)
              setRoomPrice(response.roomPrice)
              console.log(response)

        }
        catch(err){
            throw new Error(err)

        }
     }
     
      const setRoomDetails=async (roomId)=>{
        try{
          const result=getRoomById(roomId)
          setRoomInfo({
            photo: result.photo || "",
            roomType: result.roomType || "",
            roomPrice: result.roomPrice || ""
          });
        }
        catch(err){
          alert(":error in room fetching "+err.message)

        }

      }
     useEffect(()=>{
        getRoomPriceById(roomId)
        setRoomDetails(roomId);
        

     },[roomId])

     const calculatePayMent=()=>{
        const checkInDate=moment(booking.checkInDate)
        const checkOutDate=moment(booking.checkOutDate)
        const differenceDays=checkOutDate.diff(checkInDate,"days")
        const paymentPerDay=roomPrice?roomPrice:0
           console.log(differenceDays+" "+paymentPerDay)
        return differenceDays*paymentPerDay;
        

     }
     const isGuestCountValid=()=>{
        const adultCount=parseInt(booking.noOfAdults)
        const childrenCount=parseInt(booking.noOfChildrens)
        const totalCount=adultCount+childrenCount
        return totalCount>=1&&adultCount>=1
     }
     const ischeckOutDateIsValid=()=>{
        if(!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))){
            setErrorMessage('plzz eneter the valid date checkout date must be greater than the checkin date ')
            return false
        }
        else{
            setErrorMessage("")
            return true
        }

     }

     const hanldeSubmit=(e)=>{
        e.preventDefault();
        const form=e.currentTarget
       
        if(form.checkValidity()===false||!isGuestCountValid()||!ischeckOutDateIsValid()){
            e.stopPropagation()
            console.log("it is propagated ")

        }
        else{
            setIsSubMitted(true)
            console.log("it is submitted ")
        }
        setIsValidated(true)
      

     }
     const handleBooking=async()=>{
         try{
            const confirmationCode=await bookRoom(roomId,booking)
            setIsSubMitted(true)
            navigate("/booking-success",{state:{message:confirmationCode}})


               
         }
         catch(err){
           setErrorMessage(err.message)
           
           
           navigate("/booking-success",{state:{error:err.message}})
         }
     }
 
     

     return (
       <>
       <div className="flex flex-row justify-center flex-wrap">
         <div className="container mx-auto px-4 py-8">
           <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
             <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-indigo-700 flex items-center justify-center gap-2">
               <CheckCircle2 className="text-green-500" /> Book Your Stay
             </h2>
     
             <form noValidate onSubmit={hanldeSubmit} validated={isValidated} className="space-y-6">
               {errorMessage && (
                 <p className="text-red-500 font-medium text-center">{errorMessage}</p>
               )}
     
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                     <User size={18} /> Guest Name
                   </label>
                   <input
                     type="text"
                     name="guestFullName"
                     value={booking.guestFullName}
                     onChange={handleInputChange}
                     required
                     className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                   />
                 </div>
     
                 <div>
                   <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                     <Mail size={18} /> Email
                   </label>
                   <input
                     type="email"
                     name="guestEmail"
                     value={booking.guestEmail}
                     onChange={handleInputChange}
                     required
                     className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                   />
                 </div>
     
                 <div>
                   <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                     <CalendarDays size={18} /> Check-in Date
                   </label>
                   <input
                     type="date"
                     name="checkInDate"
                     value={booking.checkInDate}
                     onChange={handleInputChange}
                     required
                     className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                   />
                 </div>
     
                 <div>
                   <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                     <CalendarDays size={18} /> Check-out Date
                   </label>
                   <input
                     type="date"
                     name="checkOutDate"
                     value={booking.checkOutDate}
                     onChange={handleInputChange}
                     required
                     className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                   />
                 </div>
     
                 <div>
                   <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                     <Users size={18} /> Adults
                   </label>
                   <input
                     type="number"
                     name="noOfAdults"
                     value={booking.noOfAdults}
                     onChange={handleInputChange}
                     required
                     className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                   />
                 </div>
     
                 <div>
                   <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                     <Baby size={18} /> Children
                   </label>
                   <input
                     type="number"
                     name="noOfChildrens"
                     value={booking.noOfChildrens}
                     onChange={handleInputChange}
                     className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                   />
                 </div>
               </div>
     
               <div className="text-center text-lg font-semibold text-gray-700 mt-4">
                 Total Price: ₹{calculatePayMent()}
               </div>
     
               <div className="text-center mt-6">
                 <button
                   type="submit"
                   className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition-all"
                 >
                   continue
                 </button>
               </div>
             </form>
           </div>
         </div>
         <div >
          <div >
            {
               isSubmitted&&(<BookingSummary
               booking={booking}
               payment={calculatePayMent}
               isFormValid={isValidated}
               onConfirm={handleBooking}
               
               
               />




               )
            }
            </div>
         </div>
         </div>

       </>
     );
     
}
