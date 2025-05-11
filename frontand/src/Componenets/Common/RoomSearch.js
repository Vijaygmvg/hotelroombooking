import moment from 'moment';
import React, { useState } from 'react';
import { checkAvailableRooms } from '../Utils/ApiFunctions';
import RoomTypeSelector from "../Common/RoomTypeSelector";
import RoomSearchResult from '../Common/RoomSearchResult';

export default function RoomSearch() {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomType: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const checkInDate = moment(searchQuery.checkInDate);
    const checkOutDate = moment(searchQuery.checkOutDate);

    if (!checkInDate.isValid() || !checkOutDate.isValid()) {
      setErrorMessage("Please enter a valid date range.");
      return;
    }
    if (!checkOutDate.isSameOrAfter(checkInDate)) {
      setErrorMessage("Check-out date must come after check-in date.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await checkAvailableRooms(checkInDate, checkOutDate, searchQuery.roomType);
      setAvailableRooms(result);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prev) => ({
      ...prev,
      [name]: value
    }));

    const checkInDate = moment(searchQuery.checkInDate);
    const checkOutDate = moment(searchQuery.checkOutDate);

    if (checkInDate.isValid() && checkOutDate.isValid()) {
      setErrorMessage("");
    }
  };

  const clearSearch = () => {
    setSearchQuery({
      checkInDate: "",
      checkOutDate: "",
      roomType: ""
    });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <form onSubmit={handleSearch} className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold mb-1">Check-In Date:</label>
              <input
                type="date"
                value={searchQuery.checkInDate}
                name="checkInDate"
                onChange={handleInputChange}
                min={moment().format("YYYY-MM-DD")}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold mb-1">Check-Out Date:</label>
              <input
                type="date"
                value={searchQuery.checkOutDate}
                name="checkOutDate"
                onChange={handleInputChange}
                min={moment().format("YYYY-MM-DD")}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold mb-1">Room Type:</label>
              <RoomTypeSelector handleRoomInputChange={handleInputChange} newRoom={searchQuery} />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-8">
          {isLoading ? (
            <p className="text-center text-gray-500">Finding available rooms...</p>
          ) : availableRooms.length > 0 ? (
            <RoomSearchResult results={availableRooms} onClearSearch={clearSearch} />
          ) : (
            <p className="text-center text-gray-400">No rooms are available.</p>
          )}
        </div>

        {errorMessage && (
          <div className="text-red-500 text-center mt-4">
            {errorMessage}
          </div>
        )}
      </div>
    </>
  );
}
