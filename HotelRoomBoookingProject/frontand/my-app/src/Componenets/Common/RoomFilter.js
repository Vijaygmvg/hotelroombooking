import React, { useState } from 'react';

export default function RoomFilter({ data, setFilteredData }) {
  const [filter, setFilter] = useState('');

  const handleSelectChange = (e) => {
    const selectedRoomType = e.target.value;
    setFilter(selectedRoomType);
    const filteredRooms = data.filter((room) =>
      room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase())
    );
    setFilteredData(filteredRooms);
  };

  const clearFilter = () => {
    setFilter('');
    setFilteredData(data);
  };

  const roomTypes = ['', ...new Set(data.map((room) => room.roomType))];

  return (
    <div className="mb-6 p-6 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Filter Rooms by Type
      </h3>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <select
          className="w-full md:w-1/3 p-2 border-2 border-blue-300 rounded-md bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filter}
          onChange={handleSelectChange}
        >
          <option value="">Select Room Type</option>
          {roomTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        <button
          onClick={clearFilter}
          className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition duration-300"
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
}
