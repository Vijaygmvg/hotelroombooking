import React from 'react';

export default function RoomPaginator({ currentPage = 0, totalPages = 0, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex flex-wrap gap-2 bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl shadow-xl">
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              onClick={() => onPageChange(pageNumber)}
              className={`min-w-[40px] px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 shadow-md 
                ${
                  currentPage === pageNumber
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-105 shadow-lg'
                    : 'bg-white text-purple-700 hover:bg-purple-200 hover:scale-105'
                }`}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
