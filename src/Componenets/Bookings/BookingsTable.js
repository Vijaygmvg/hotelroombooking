import React, { useEffect, useState } from 'react';
import { parseISO } from 'date-fns';
import DateSlider from '../Common/DateSlider';

function BookingsTable({ bookingInfo, handleBookingCancelation}) {
  const [filteredBookings, setFilteredBookings] = useState(bookingInfo);

  const filterBookings = (startDate, endDate) => {
    let filtered = bookingInfo;
    if (startDate && endDate) {
      filtered = bookingInfo.filter((booking) => {
        console.log(booking)

        console.log(booking.checkInDate)
        
        const bookingStartDate = parseISO(booking.checkInDate);
        const bookingEndDate = parseISO(booking.checkOutDate);
        console.log(bookingStartDate)
        console.log(bookingEndDate)
        return (
          bookingStartDate >= startDate &&
          bookingEndDate <= endDate &&
          bookingEndDate > startDate
        );
      });
    }
    setFilteredBookings(filtered);
  };

  useEffect(() => {
    setFilteredBookings(bookingInfo);
  }, [bookingInfo]);

  return (
    <div className="p-4">
      <section className="bg-white shadow-lg rounded-lg p-6">
        <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings} />

        <div className="overflow-x-auto mt-6">
          <table className="min-w-full table-auto text-sm text-gray-700 table border-black">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">S/N</th>
                <th className="px-4 py-2">Booking ID</th>
                <th className="px-4 py-2">Room ID</th>
                <th className="px-4 py-2">Check-In Date</th>
                <th className="px-4 py-2">Check-Out Date</th>
                <th className="px-4 py-2">Guest Name</th>
                <th className="px-4 py-2">Guest Email</th>
                <th className="px-4 py-2">Adults</th>
                <th className="px-4 py-2">Children</th>
                <th className="px-4 py-2">Total Guests</th>
                <th className="px-4 py-2">Confirmation Code</th>
                <th className="px-4 py-2" colSpan={2}>Actions</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {filteredBookings.map((booking, index) => (
                <tr key={booking.id} className="border-b hover:bg-gray-100  border-black border-solid ">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{booking.bookingId}</td>
                  <td className="px-4 py-2">{booking.room.id}</td>
                  <td className="px-4 py-2">{booking.checkInDate}</td>
                  <td className="px-4 py-2">{booking.checkOutDate}</td>
                  <td className="px-4 py-2">{booking.guestFullName}</td>
                  <td className="px-4 py-2">{booking.guestEmail}</td>
                  <td className="px-4 py-2">{booking.noOfAdults}</td>
                  <td className="px-4 py-2">{booking.noOfChildrens}</td>
                  <td className="px-4 py-2">{booking.totalNoOfGuest}</td>
                  <td className="px-4 py-2">{booking.bookingConfirmationCode}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      onClick={() => handleBookingCancelation(booking.bookingId)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBookings.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No bookings found for the selected dates.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default BookingsTable;
