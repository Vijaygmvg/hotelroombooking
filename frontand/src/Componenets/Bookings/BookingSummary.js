import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function BookingSummary({ booking, payment, isFormValid, onConfirm }) {
  const checkInDate = moment(booking.checkInDate)
  const checkOutDate = moment(booking.checkOutDate)
  const numberOfDays = checkOutDate.diff(checkInDate, 'days')

  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
  const [isProcessingPayMent, setIsProcessingPayMent] = useState(false)

  const navigate = useNavigate()

  const handleConfirmBooking = async () => {
    setIsProcessingPayMent(true)
    setTimeout(() => {
      setIsProcessingPayMent(false)
      setIsBookingConfirmed(true)
      onConfirm()
    }, 3000)
  }

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate('/booking-success')
    }
  }, [isBookingConfirmed, navigate])

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-10">
      <h4 className="text-2xl font-bold text-center text-indigo-700 mb-4">
        Reservation Summary
      </h4>

      <div className="space-y-2 text-gray-700">
        <p>
          Full Name: <strong>{booking.guestFullName}</strong>
        </p>
        <p>
          Email: <strong>{booking.guestEmail}</strong>
        </p>
        <p>
          Check-In Date:{' '}
          <strong>{moment(booking.checkInDate).format('MMM DD, YYYY')}</strong>
        </p>
        <p>
          Check-Out Date:{' '}
          <strong>{moment(booking.checkOutDate).format('MMM DD, YYYY')}</strong>
        </p>
        <p>
          Number of Days: <strong>{numberOfDays}</strong>
        </p>
        <p>
          No. of Adults: <strong>{booking.noOfAdults}</strong>
        </p>
        <p>
          No. of Children: <strong>{booking.noOfChildrens}</strong>
        </p>
      </div>

      {payment() > 0 ? (
        <>
          <div className="text-center text-lg font-semibold text-gray-800 mt-6">
            Total Payment: ₹<strong>{payment()}</strong>
          </div>

          {isFormValid && !isBookingConfirmed && (
            <div className="text-center mt-6">
              <button
                onClick={handleConfirmBooking}
                className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition-all"
              >
                {isProcessingPayMent ? (
                  <span role="status" className="animate-pulse">
                    Booking confirmed, redirecting...
                  </span>
                ) : (
                  <>Confirm Booking & Proceed to Payment</>
                )}
              </button>
            </div>
          )}

          {isBookingConfirmed && (
            <div className="flex justify-center mt-4">
              <div className="text-indigo-600 font-medium">Redirecting...</div>
            </div>
          )}
        </>
      ) : (
        <div className="mt-4 text-center text-red-600 font-semibold">
          Check-out date must be after the check-in date.
        </div>
      )}
    </div>
  )
}

export default BookingSummary
