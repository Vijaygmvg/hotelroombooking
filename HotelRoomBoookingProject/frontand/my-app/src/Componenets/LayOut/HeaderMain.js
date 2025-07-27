import React from 'react';
import { FaHotel } from 'react-icons/fa';

function HeaderMain() {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="max-w-6xl mx-auto px-4 flex items-center space-x-4">
        <FaHotel className="text-blue-600 text-3xl" />
        <h1 className="text-2xl font-bold text-gray-800">StayInn Hotels</h1>
      </div>
    </header>
  );
}

export default HeaderMain;
