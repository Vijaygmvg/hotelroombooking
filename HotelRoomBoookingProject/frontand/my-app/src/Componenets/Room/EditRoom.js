import React, { useEffect } from 'react'
import { useState } from 'react';
import { getRoomById, updateRoom } from '../Utils/ApiFunctions';
import { Link, useParams } from 'react-router-dom';
export default function EditRoom() {
    const {roomId}=useParams();
    const [room, setRoom] = useState({
        photo: null,
        roomType: '',
        roomPrice: ''
      });
      const [imagePreview, setImagePreview] = useState('');
      const [successMessage, setSuccessMessage] = useState('');
      const [errorMessage, setErrorMessage] = useState('');
    
      const handleRoomInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRoom({ ...room, [name]: value });
      };

      useEffect(()=>{
        const fetchRoom=async ()=>{
         try{
        const roomData=await getRoomById(roomId)
        setRoom(roomData)
         }
         catch(err){
            console.error(err.message)

         }
        }
         fetchRoom()

      },[roomId])
    
    

      const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setRoom({ ...room, photo: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));
      };

      const handleSubmit=async (e)=>{
        e.preventDefault()
        try{

            const response=await updateRoom(roomId,room)
            console.log(response);
            if(response.status===204)
            {
                setSuccessMessage("room updated succesfullyy ")
                const updatedRoomData=await getRoomById(roomId)
                setRoom(updatedRoomData)
                setImagePreview(`data:image/jpeg;base64,${updatedRoomData.photo}`);
                setErrorMessage("")
            }
            else{
                setErrorMessage("error in updating room")
            }
        }
        catch(err){
            console.error(err.message)
            setErrorMessage(err.message)

        }

      }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-2xl rounded-xl mt-10 space-y-6">
  {successMessage && (
    <div className="text-green-600 bg-green-100 border border-green-300 rounded-md p-4 text-center text-lg font-semibold" role="alert">
      {successMessage}
    </div>
  )}
  {errorMessage && (
    <div className="text-red-600 bg-red-100 border border-red-300 rounded-md p-4 text-center text-lg font-semibold" role="alert">
      {errorMessage}
    </div>
  )}

  <form onSubmit={handleSubmit} className="space-y-5">
    <div>
      <label htmlFor="roomType" className="block text-gray-700 font-medium mb-1">
        Room Type
      </label>
      <input
        type="text"
        value={room.roomType}
        onChange={handleRoomInputChange}
        id="roomType"
        name="roomType"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter room type"
      />
    </div>

    <div>
      <label htmlFor="roomPrice" className="block text-gray-700 font-medium mb-1">
        Room Price
      </label>
      <input
        type="number"
        value={room.roomPrice}
        onChange={handleRoomInputChange}
        id="roomPrice"
        name="roomPrice"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter room price"
      />
    </div>

    <div>
      <label htmlFor="photo" className="block text-gray-700 font-medium mb-1">
        Photo
      </label>
      <input
        type="file"
        onChange={handleImageChange}
        id="photo"
        name="photo"
        className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
      />

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="mt-4 rounded-lg shadow-md max-w-full max-h-64 border border-blue-300"
        />
      )}
    </div>

    <div className="text-right">
      <Link
        to="/existing-rooms"
        className="text-blue-600 hover:underline text-sm font-medium"
      >
        ← Back to Rooms
      </Link>
    </div>

    <div className="text-center">
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 font-semibold"
      >
        Edit Room
      </button>
    </div>
  </form>
</div>

  )
}
