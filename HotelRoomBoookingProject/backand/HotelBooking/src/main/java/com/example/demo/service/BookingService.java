package com.example.demo.service;

import java.sql.SQLException;
import java.util.List;

import com.example.demo.entity.BookedRoom;
import com.example.demo.exception.InvalidBookingRequestException;
import com.example.demo.exception.InvalidPayment;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.response.BookingResponse;

public interface BookingService {

	public List<BookedRoom> getAllBookingsByRoomId(Long roomId);

	public void cancelBooking(Long bookingId);



	public BookedRoom findByBookingConfirmationCode(String confirmationCode)throws ResourceNotFoundException;
	      
	public List<BookedRoom> findAllBookings();

	public List<BookedRoom> getAllBookings();

	public List<BookingResponse> getByGuestEmail(String email);

	String saveBooking(Long roomId, BookedRoom bookingRequest, Long paymentId)
			throws SQLException, InvalidBookingRequestException, InvalidPayment;
}

