package com.example.demo.response;

import java.time.LocalDate;

import com.example.demo.entity.BookedRoom;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookingResponse {
	
   public Long bookingId;
	
	
	private LocalDate checkInDate;
	
	
	private LocalDate checkOutDate;
	
	
	private String guestFullName;
	
	
	private String guestEmail;
	
	
	private int noOfAdults;
	
	
	private int noOfChildrens;
	
	
	private int totalNoOfGuest;
	
	
	private String bookingConfirmationCode;
	
	
	private RoomResponse  room;


	public BookingResponse(Long bookingId, LocalDate checkIndate, LocalDate checkOutDate,
			String bookingConfirmationCode) {
		super();
		this.bookingId = bookingId;
		this.checkInDate = checkIndate;
		this.checkOutDate = checkOutDate;
		this.bookingConfirmationCode = bookingConfirmationCode;
	}
	public BookingResponse(BookedRoom bookedRoom) {
		this.bookingId=bookedRoom.bookingId;
		this.checkInDate=bookedRoom.getCheckInDate();
		this.checkOutDate=bookedRoom.getCheckOutDate();
		this.guestEmail=bookedRoom.getGuestEmail();
		this.guestFullName=bookedRoom.getGuestFullName();
		this.noOfAdults=bookedRoom.getNoOfAdults();
		this.noOfChildrens=bookedRoom.getNoOfChildrens();
		this.totalNoOfGuest=bookedRoom.getTotalNoOfGuest();
		this.bookingConfirmationCode=bookedRoom.getBookingConfirmationCode();
		this.room=new RoomResponse(bookedRoom.getRoom().getId(),bookedRoom.getRoom().getRoomType(),bookedRoom.getRoom().getRoomPrice());

	
	

}
}
