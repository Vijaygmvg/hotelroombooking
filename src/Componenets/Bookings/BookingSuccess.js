import React from 'react'
import { useLocation } from 'react-router-dom'

function BookingSuccess() {
    const location = useLocation()
    const message = location.state?.message
    const error = location.state?.error

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-blue-600">
                    Booking Status
                </h1>
            </div>

            <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6">
                {message ? (
                    <div className="text-green-600">
                        <h3 className="text-2xl font-semibold mb-2">
                            Booking Successful
                        </h3>
                        <p className="text-lg">{message}</p>
                    </div>
                ) : (
                    <div className="text-red-600">
                        <h3 className="text-2xl font-semibold mb-2">
                            Error in Booking
                        </h3>
                        <p className="text-lg">{error}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BookingSuccess
