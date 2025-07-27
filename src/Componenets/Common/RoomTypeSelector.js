import React, { useState, useEffect } from 'react';
import { getRoomTypes } from '../Utils/ApiFunctions';

export default function RoomTypeSelector({ handleRoomInputChange, newRoom }) {
  const [roomTypes, setRoomTypes] = useState([""]);
  const [showRoomTypeInput, setShowRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    getRoomTypes().then((data) => {
      console.log(data);
      setRoomTypes(data);
    });
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoomType("");
      setShowRoomTypeInput(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Room Type Dropdown */}
      <div className="text-center">
        <select
          id="roomType"
          name="roomType"
          value={newRoom.roomType}
          onChange={(e) => {
            if (e.target.value === "add New") {
              setShowRoomTypeInput(true);
            } else {
              handleRoomInputChange(e);
            }
          }}
          className="w-full px-4 py-2 border-2 border-pink-400 rounded-lg bg-pink-50 text-pink-700 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="">Select Room Type</option>
          <option value="add New">➕ Add New</option>
          {roomTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* New Room Type Input */}
      {showRoomTypeInput && (
        <div className="text-center">
          <input
            type="text"
            placeholder="Enter a new room type"
            value={newRoomType}
            onChange={handleNewRoomTypeInputChange}
            className="w-full px-4 py-2 border-2 border-blue-400 rounded-lg bg-blue-50 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleAddNewRoomType}
            className="mt-3 w-full py-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-white font-bold hover:scale-105 transition-transform"
          >
            ✅  🎨Add Room Type
          </button>
        </div>
      )}
    </div>
  );
}
