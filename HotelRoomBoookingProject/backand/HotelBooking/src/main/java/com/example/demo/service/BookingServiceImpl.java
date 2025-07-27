package com.example.demo.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.demo.entity.BookedRoom;
import com.example.demo.entity.Payment;
import com.example.demo.entity.Room;
import com.example.demo.exception.InvalidBookingRequestException;
import com.example.demo.exception.InvalidPayment;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.PaymentRepository;
import com.example.demo.response.BookingResponse;

import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor

@Service
public class BookingServiceImpl implements BookingService{

	
	private final BookingRepository bookingRepository;
	private final RoomService roomService;
	private final SendEmail sendEmail;
	private final PaymentService paymentService;
	private final PaymentRepository paymentRepository;
	
	@Override
	public List<BookedRoom> findAllBookings() {
		return bookingRepository.findAll();
	}
	
	@Override
	public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
		
		return bookingRepository.findByRoomId(roomId);
	}

	@Override
	public void cancelBooking(Long bookingId) {
		
		
		bookingRepository.deleteById(bookingId);
		
	}
	
	
   @Transactional
	@Override
	public String saveBooking(Long roomId, BookedRoom bookingRequest,Long paymentId) throws SQLException,InvalidBookingRequestException, InvalidPayment {
		String frontandUrl="http://localhost:3000/show-booking";
	
		Payment payment=paymentService.getPayment(paymentId);
		if(payment==null||payment.isUsed()) {
			throw new InvalidPayment("the payment id is not coorect");
		}
		
		if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate()))
		{
			throw new InvalidBookingRequestException("check in date must be come before check put date");
		}
		Room room=roomService.getRoomByRoomId(roomId);
		List<BookedRoom> existingBookings= room.getBookings();
		boolean roomIsAvailable=roomIsAvailable(bookingRequest,existingBookings);
		  if(roomIsAvailable) {
			    room.addBooking(bookingRequest);
			    bookingRepository.save(bookingRequest);
			    payment.setUsed(true);
			    paymentRepository.save(payment);
			    
			    String targetUrl = UriComponentsBuilder.fromUriString(frontandUrl)
		                .queryParam("confirmationCode", bookingRequest.getBookingConfirmationCode())
		                .build().toUriString();
				 String htmlContent = "<p>Hello,</p>"
			                + "<p>message os from  lake side hotel your booking is confirmed <br> verify here:</p>"
			                + "<a href=\"" + targetUrl + "\">view-booking</a>"
			                + "<p>thankyou</p>";
				    try {
						sendEmail.sendEmailWithLink(bookingRequest.getGuestEmail(),"Room Booking Confirmed ", htmlContent);
					} catch (MessagingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
			    
		  }
		  else {
			  throw new InvalidBookingRequestException("Soory !  this room has been boooked for the selected dates this room is not available  ");
		  }
		return bookingRequest.getBookingConfirmationCode();
	}

	@Override
	public BookedRoom findByBookingConfirmationCode(String confirmationCode) throws ResourceNotFoundException
	{
	   BookedRoom bookedRoom =bookingRepository.findByBookingConfirmationCode(confirmationCode);
	    if(bookedRoom!=null) {
	    	return bookedRoom;
	    }
	    else {
	    	throw new ResourceNotFoundException("the given confirmationCode is nto found enter correct confirmatjion code");
	    }
	}
	
	  @Transactional
	private boolean roomIsAvailable(BookedRoom bookingRequest,List<BookedRoom> existingBookings) {
		 return existingBookings.stream()
	                .noneMatch(existingBooking ->
	                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
	                                || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
	                                || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
	                                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
	                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

	                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
	                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

	                                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))

	                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
	                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

	                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
	                                && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
	                );
		
                
		
	}

	@Override
	public List<BookedRoom> getAllBookings() {
		return bookingRepository.findAll();
	}
	
	
	
  @Transactional
	@Override
	public List<BookingResponse> getByGuestEmail(String email) {
		List<BookedRoom> bookedRoom=bookingRepository.findByGuestEmail(email);
		List<BookingResponse> bookingResponse=new ArrayList<>();
		bookedRoom.stream().forEach(a->bookingResponse.add(new BookingResponse(a)));
		
		return bookingResponse;
	}

	
	
	

}
