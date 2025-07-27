import React, { useEffect, useState } from 'react'
import { cancelBooking, getAllBookings } from '../Utils/ApiFunctions'
import { TbRulerOff } from 'react-icons/tb'
import Header from '../Common/Header'
import BookingsTable from './BookingsTable'

export default function Bookings() {

    const [bookingInfo,setBookingInfo]=useState([])
    const [isLoading,setIsLoading]=useState(TbRulerOff)
    const[error,setError]=useState("")
      useEffect(()=>{
        setTimeout(async ()=>{
            try{
            const result=await getAllBookings();
           
          
            setBookingInfo(result)
           
            setIsLoading(false)


            }
            catch(err){
              alert(err.message)
                setError(err.message)
                setIsLoading(false)
            }
            
               
        },3000)
      },[])
        
      const handleBookingCancelation=async (bookingId)=>{
        
        try{
                await cancelBooking(bookingId)
                const data=await getAllBookings()
                setBookingInfo(data)
        }
        catch(err){
            setError(err.message)

        }

      }

  return (
    <div>
      <section className="container bg-blue-100" >
        <Header title={"existing bookings"} />
        {error?(<div className="text-red-500">{error}</div>):<div></div>}
        {isLoading?(<div>

          Loading  Existing Bookings 
        </div>):
        (
         <BookingsTable bookingInfo={bookingInfo} handleBookingCancelation={handleBookingCancelation}/>
        )}
         
      </section>
    </div>
  )
}
