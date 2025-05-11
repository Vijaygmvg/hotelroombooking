package com.example.demo.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.BookedRoom;
import com.example.demo.entity.Room;
import com.example.demo.exception.InvalidBookingRequestException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.response.BookingResponse;
import com.example.demo.response.RoomResponse;
import com.example.demo.service.BookingService;
import com.example.demo.service.RoomService;

import lombok.RequiredArgsConstructor;


//@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RestController

@RequestMapping("/bookings")
public class BookingController {

	
	private final BookingService bookingService;
	private final RoomService roomService;
	
	
	@GetMapping("/all-bookings")
	public ResponseEntity<List<BookingResponse>> getAllBookings() throws SQLException{
		
		List<BookedRoom> bookings= bookingService.getAllBookings();
		List<BookingResponse> bookingResponses=new ArrayList<>();
		
		for(BookedRoom booking:bookings) {
			BookingResponse bookingResponse=getBookingResponse(booking);
			bookingResponses.add(bookingResponse);
			
			
		}
		return ResponseEntity.ok(bookingResponses);
		
		
		
	}
	
	
	@GetMapping("/confirmation/{confirmationCode}")
	public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode) throws SQLException,ResourceNotFoundException{
		System.out.println("it is asking for confirmation");
		try {
			 BookedRoom booking=bookingService.findByBookingConfirmationCode(confirmationCode);
			 BookingResponse bookingResponse=getBookingResponse(booking);
			 
			 return ResponseEntity.ok(bookingResponse);
			 
		}
		catch(ResourceNotFoundException e) {
			
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
			
			
			
		}
	
		
		
			
			
		}
	
	@PostMapping("/room/{roomId}/booking")
	public ResponseEntity<?> saveBoooking(@PathVariable Long roomId,
			 @RequestBody BookedRoom bookingRequest) throws SQLException{
		    System.out.println("the booking room is came and hitted ");
		try {
			String confirmationCode=bookingService.saveBooking(roomId,bookingRequest);
			return ResponseEntity.ok("room booked succesfully ! you booking confirmation code is "+confirmationCode);
		}
		
		
		catch(InvalidBookingRequestException  e) {
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
			
			
			
		}
		
	}
	
	@DeleteMapping("/booking/{bookingId}/delete")
	public void cancelBooking(@PathVariable Long bookingId) {
		
		bookingService.cancelBooking(bookingId);
	}
	
	private BookingResponse getBookingResponse(BookedRoom booking) throws SQLException {
		
		Room theRoom=roomService.getRoomByRoomId(booking.getRoom().getId());
		
		RoomResponse room=new RoomResponse(theRoom.getId(),theRoom.getRoomType(),theRoom.getRoomPrice());
		return new BookingResponse(booking.getBookingId(),booking.getCheckInDate(),booking.getCheckOutDate(),booking.getGuestFullName(),booking.getGuestEmail(),booking.getNoOfAdults(),booking.getNoOfChildrens(),booking.getTotalNoOfGuest(),booking.getBookingConfirmationCode(),room);
		
		
	}
	
	@GetMapping("/user/{email}/bookings")
	public ResponseEntity<?> getBookingsByUserId(@PathVariable("email") String email){
		try {
		List<BookingResponse> bookedRooms=bookingService.getByGuestEmail(email);
		System.out.println("yes it is not having issues"+bookedRooms.size());
	    
		return new ResponseEntity<>(bookedRooms,HttpStatus.OK);
		}
		catch(Exception e) {
			
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	
}
