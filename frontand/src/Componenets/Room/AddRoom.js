import React, { useState } from 'react';
import { addRoom } from '../Utils/ApiFunctions';
import RoomTypeSelector from '../Common/RoomTypeSelector';
import { Link } from 'react-router-dom';

export default function AddRoom() {
  const [newRoom, setNewRoom] = useState({
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
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
      if (success !== undefined) {
        setSuccessMessage('A new room was added to the database.');
        alert(successMessage);
        setNewRoom({ photo: null, roomType: '', roomPrice: '' });
        setImagePreview('');
        setErrorMessage('');
      } else {
        setErrorMessage('Error adding room.');
        alert('Error adding room');
      }
    } catch (error) {
      setErrorMessage(error.errorMessage);
      alert(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 via-pink-100 to-orange-100 flex items-center justify-center p-4">
      <section className="bg-white shadow-2xl rounded-xl p-8 max-w-2xl w-full">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-6">Add a New Room</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Room Type */}
          <div>
            <label htmlFor="roomType" className="block text-lg font-semibold text-gray-700 mb-1">
              Room Type
            </label>
            <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom} />
          </div>

          {/* Room Price */}
          <div>
            <label htmlFor="roomPrice" className="block text-lg font-semibold text-gray-700 mb-1">
              Room Price
            </label>
            <input
              required
              id="roomPrice"
              name="roomPrice"
              value={newRoom.roomPrice}
              onChange={handleRoomInputChange}
              type="number"
              className="w-full border-2 border-blue-300 rounded-md p-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Room Photo */}
          <div>
            <label htmlFor="photo" className="block text-lg font-semibold text-gray-700 mb-1">
              Room Photo
            </label>
            <input
              id="photo"
              name="photo"
              type="file"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 rounded-lg shadow-lg max-w-full max-h-64 border border-blue-300"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 text-white text-lg font-semibold bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300"
            >
              
              Save Room
            </button>
          </div>
        </form>
        <div className="text-center mt-6">
  <Link
    to="/existing-rooms"
    className="px-6 py-3 text-white text-lg font-semibold bg-gradient-to-r from-red-500 to-blue-600 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300"
  >
   back
  </Link>
</div>
      </section>
    </div>
  );
}
