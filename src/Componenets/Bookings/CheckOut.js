import React, { useState, useEffect } from 'react'
import BookingForm from './BookingForm'
import { useParams } from 'react-router-dom'
import { getRoomById } from '../Utils/ApiFunctions'
import { FaCar, FaParking, FaTshirt, FaWifi } from 'react-icons/fa'
import RoomCarousel from '../Common/RoomCarousel'
function CheckOut() {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: ""
  })

  const { roomId } = useParams()

  useEffect(() => {
    setTimeout(async () => {
      try {
        const result = await getRoomById(roomId)
        setRoomInfo(result)
      } catch (err) {
        setError(err)
      }
      setIsLoading(false)
    }, 2000)
  }, [roomId])

  return (
    <div>
      <div>
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <section className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col  md:flex-col items-center  gap-10">
          <div className="w-full md:w-1/2">
            {isLoading ? (
              <p className="text-gray-600 text-lg">Loading room information...</p>
            ) : error ? (
              <p className="text-red-500">{error.message}</p>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex justify-center">
                  <img
                    src={`data:image/png;base64,${roomInfo.photo}`}
                    alt="Room"
                    className="rounded-lg w-full max-w-md h-80 object-cover"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 rounded-md">
                    <tbody>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left font-semibold">Room Type</th>
                        <td className="px-4 py-2">{roomInfo.roomType}</td>
                      </tr>
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold">Room Price</th>
                        <td className="px-4 py-2">₹ {roomInfo.roomPrice}</td>
                      </tr>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left font-semibold">Facilities</th>
                        <td className="px-4 py-2">
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2"><FaWifi /> Free Wifi</li>
                            <li className="flex items-center gap-2"><FaCar /> Car Parking</li>
                            <li className="flex items-center gap-2"><FaParking /> Parking Space</li>
                            <li className="flex items-center gap-2"><FaTshirt /> Laundry</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Booking Form */}
          <div className="w-full md:w-1/2">
            <BookingForm />
          </div>
        </div>
      </section>
    </div>
    </div>
    <div className="container"> 
       <RoomCarousel/>
    </div>
    </div>
  )
}

export default CheckOut
