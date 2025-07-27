import React from 'react';
import { Link } from 'react-router-dom';

function RoomCard({
  room = {
    roomType: "Sample Room",
    roomPrice: 5000,
    photo: "", // fallback if not provided
  },
}) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col lg:flex-row items-center lg:items-start gap-6 max-w-4xl mx-auto my-6 border border-gray-200 hover:shadow-2xl transition-shadow">
      
      {/* Room Image */}
      <div className="w-full lg:w-1/3 max-h-60 overflow-hidden rounded-xl">
        <img
          src={`data:image/jpeg;base64,${room.photo}`}
          alt="Room"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Room Info */}
      <div className="flex-1 text-center lg:text-left space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">{room.roomType}</h2>
        <p className="text-lg text-gray-600">₹{room.roomPrice}/night</p>
        <p className="text-sm text-gray-500">
          Enjoy your stay with our well-furnished and spacious room.
        </p>
      </div>

      {/* Book Button */}
      <div className="mt-4 lg:mt-0">
        <Link
          to={`/book-room/${room.id}`}
          className="inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full text-sm font-semibold transition duration-300"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}

export default RoomCard;
