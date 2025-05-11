import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { deleteUser, getUser } from '../Utils/ApiFunctions'
import { getBookingByUserId } from '../Utils/ApiFunctions'


function Profile() {

  
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
            setBookings(response)
        } catch (error) {
            console.error("Error fetching bookings:", error.message)
            setErrorMessage(error.message)
        }
    }

    fetchBookings()
}, [userId])

const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
    )
    if (confirmed) {
        await deleteUser(userId)
            .then((response) => {
                setMessage(response.data)
                localStorage.removeItem("token")
                localStorage.removeItem("userId")
                localStorage.removeItem("userRole")
                navigate("/")
                window.location.reload()
            })
            .catch((error) => {
                setErrorMessage(error.data)
            })
    }
}

    
  return (
    <div>
    <div className="container mx-auto p-4">
  {errorMessage && <p className="text-red-600">{errorMessage}</p>}
  {message && <p className="text-red-600">{message}</p>}

  {user ? (
    <div className="bg-gray-100 p-6 mt-6 rounded-lg shadow-md">
      <h4 className="text-center text-xl font-semibold mb-4">User Information</h4>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
          <div className="md:col-span-2 flex justify-center items-center">
            <img
              src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
              alt="Profile"
              className="rounded-full w-36 h-36 object-cover"
            />
          </div>

          <div className="md:col-span-10">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row">
                <label className="md:w-1/5 font-bold">ID:</label>
                <p className="md:w-4/5">{user.id}</p>
              </div>
              <hr />

              <div className="flex flex-col md:flex-row">
                <label className="md:w-1/5 font-bold">First Name:</label>
                <p className="md:w-4/5">{user.firstName}</p>
              </div>
              <hr />

              <div className="flex flex-col md:flex-row">
                <label className="md:w-1/5 font-bold">Last Name:</label>
                <p className="md:w-4/5">{user.lastName}</p>
              </div>
              <hr />

              <div className="flex flex-col md:flex-row">
                <label className="md:w-1/5 font-bold">Email:</label>
                <p className="md:w-4/5">{user.email}</p>
              </div>
              <hr />

              <div className="flex flex-col md:flex-row">
                <label className="md:w-1/5 font-bold">Roles:</label>
                <ul className="md:w-4/5 list-disc pl-5">
                  {user.roles.map((role) => (
                    <li key={role.id}>{role.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h4 className="text-center text-xl font-semibold mb-4">Booking History</h4>

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
                    {moment(booking.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
                  </td>
                  <td className="px-4 py-2">
                    {moment(booking.checkOutDate).subtract(1, "month").format("MMM Do, YYYY")}
                  </td>
                  <td className="px-4 py-2">{booking.bookingConfirmationCode}</td>
                  <td className="px-4 py-2 text-green-600">On-going</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">You have not made any bookings yet.</p>
      )}

      <div className="flex justify-center mt-6">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 text-sm"
          onClick={handleDeleteAccount}
        >
          Close account
        </button>
      </div>
    </div>
  ) : (
    <p className="text-center">Loading user data...</p>
  )}
</div>



    </div>
  )
}

export default Profile