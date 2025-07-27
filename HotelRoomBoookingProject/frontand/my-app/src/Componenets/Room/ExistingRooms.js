import React, { useEffect, useState } from 'react'
import { deleteRoom, getAllRooms } from '../Utils/ApiFunctions';
import RoomFilter from '../Common/RoomFilter';
import RoomPaginator from '../Common/RoomPaginator';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaEye,FaEdit, FaPlus } from 'react-icons/fa';



export default function ExistingRooms() {
    const [rooms,setRooms]=useState([])
    const [currentPage,setCurrentPage]=useState(1);
    const[roomsPerPage]=useState(8)
    const[isLoading,setIsLoading]=useState(false)
    const[filteredRooms,setFilteredRooms]=useState([])
    const [selectedRoomType,setSelectedRoomType]=useState("")
    const[successMessage,setSuccessMessage]=useState("")
    const [errorMessage,setErrorMessage]=useState("")
    const userRole=localStorage.getItem("userRole")

    useEffect(()=>{

          fetchRooms()
    },[])
    const fetchRooms=async()=>{
          setIsLoading(true)
          try{
         const result=await getAllRooms()
         setRooms(result)
         console.log(result)
         setIsLoading(false)
          }
          catch(err){
            setErrorMessage(err.message)
            

          }

    }
    
    
    useEffect(()=>{
        if(selectedRoomType===""){
            setFilteredRooms(rooms)
        }
        else{
            const filtered=rooms.filter((room)=>room.roomType===selectedRoomType)
            setFilteredRooms(filtered)
            
        }
        setCurrentPage(1);
    },[rooms,selectedRoomType])

    const calculateTotalPages=(filterdRooms,roomsPerPage)=>{
          const totalRooms= filteredRooms.length>0?filteredRooms.length:rooms.length
          return Math.ceil(totalRooms/roomsPerPage)
    }
    const handlePaginationClick=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }
   
    const handleDeleteRoom=async (roomId)=>{
      
      try{
           const result=await deleteRoom(roomId);
           if(result===""){
            setErrorMessage("")
            setSuccessMessage(`room No ${roomId} was deleted `)
            fetchRooms()
            alert("deleted room succesfulluy")
           }
           else{
            console.error( `error in deleting room ${result.message}`)
           }

      }
      catch(err){
        setErrorMessage(err.message)

      }
      setTimeout(()=>{
        setSuccessMessage("")
        setErrorMessage("")
      },3000)

    }
    const indexOfLastRoom=currentPage*roomsPerPage;
    const indexOfFirstRoom=indexOfLastRoom-roomsPerPage;
    const currentRooms=filteredRooms.slice(indexOfFirstRoom,indexOfLastRoom)


  return (
    <>
   
    {isLoading?(
<p>page is getting loading </p>
    ):(
        <>
        <section className="mt-5 mb-5 container">
           <div className="flex justify-center mb-3 mt-5 ">
            <h2>existing Rooms </h2>
            
           </div>
           {userRole&&userRole.indexOf("ROLE_ADMIN")!==-1&&(
           <div  className=" text-blue-700 container">
            <Link to={"/add-room"}  className="flex flex-row justify-end">
          
                  <div className=" max-w-[30vw]">ADD ROOM</div>
                <div className="pt-1"><FaPlus/></div>
               

            </Link>
            </div>
           )}
          
          
           <div className=""> 
            <RoomFilter data={rooms} setFilteredData={setFilteredRooms}/>

           </div>

           <div className="overflow-x-auto p-4">
  <table className="min-w-full border-collapse rounded-xl overflow-hidden shadow-lg bg-white">
    <thead className="bg-gradient-to-r from-pink-400 to-red-400 text-white">
      <tr>
        <th className="py-3 px-6 text-left border-b border-pink-200">ID</th>
        <th className="py-3 px-6 text-left border-b border-pink-200">Room Type</th>
        <th className="py-3 px-6 text-left border-b border-pink-200">Room Price</th>
        <th className="py-3 px-6 text-left border-b border-pink-200">Actions</th>
      </tr>
    </thead>

    <tbody>
      {currentRooms.map((room) => (
        <tr key={room.id} className="hover:bg-pink-100 transition duration-300">
          <td className="py-3 px-6 border-b border-gray-200">{room.id}</td>
          <td className="py-3 px-6 border-b border-gray-200">{room.roomType}</td>
          <td className="py-3 px-6 border-b border-gray-200">{room.roomPrice}</td>
          <td className="py-3 px-6 border-b border-gray-200">
            <button className=" px-3 py-1 rounded mr-2 transition">
              <div className=" flex flex-row gap-4">
              <span className='bg-orange-300  min-w-6 justify-center ' ><Link
                                    to={`/book-room/${room.id}`}
                                    className="inline-block mt-2 bg-green-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-green-700"
                                  >
                                    <FaEye/>
                                  </Link></span>
              
            {  userRole&&userRole.indexOf("ROLE_ADMIN")!==-1&&(<span className="bg-pink-600 min-w-6 justify-center"><Link to={`/edit/room/${room.id}`}><FaEdit/></Link></span>)}
              </div>
              
            </button>
            {userRole&&userRole.indexOf("ROLE_ADMIN")!==-1&&(<button className="bg-white-500 hover:bg-red-600 text-white px-3 py-1 rounded transition" onClick={()=>handleDeleteRoom(room.id)}>
            <MdDelete color="green" />
            </button>)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

           <RoomPaginator
           currentPage={currentPage}
           totalPages={calculateTotalPages(filteredRooms,roomsPerPage)}
           onPageChange={handlePaginationClick}
           /> 

        </section>
        </>

    )}
    </>
  )
}
