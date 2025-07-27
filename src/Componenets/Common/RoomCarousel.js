import React, { useState, useEffect } from 'react';
import { getAllRooms } from '../Utils/ApiFunctions';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function RoomCarousel() {
  const [rooms, setRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        setRooms(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message || 'Failed to fetch rooms');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="text-center text-blue-600 font-semibold">Loading...</div>;
  }

  if (errorMessage) {
    return <div className="text-center text-red-500 font-bold">Error: {errorMessage}</div>;
  }

  return (
    <section className="py-10 bg-gray-100">
      <h2 className="text-center text-3xl font-bold mb-6 text-blue-700">Explore Our Rooms</h2>

      <div className="text-center mb-8">
        <Link
          to="/browse-all-rooms"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Browse All Rooms
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <Carousel
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={3000}
        >
          {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
            >
              {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-xl shadow-md p-4 transition-transform hover:scale-105"
                >
                  <Link to={`/book-room/${room.id}`}>
                    <img
                      src={`data:image/jpeg;base64,${room.photo}`}
                      alt="Room"
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </Link>
                  <div className="mt-3">
                    <h3 className="text-lg font-semibold text-gray-800">{room.roomType}</h3>
                    <p className="text-blue-600 font-medium">₹ {room.roomPrice}</p>
                    <Link
                      to={`/book-room/${room.id}`}
                      className="inline-block mt-2 bg-green-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-green-700"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export default RoomCarousel;
