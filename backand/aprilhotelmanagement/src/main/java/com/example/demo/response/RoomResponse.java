package com.example.demo.response;

import java.math.BigDecimal;
import java.util.List;

import org.apache.tomcat.util.codec.binary.Base64;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RoomResponse {
private long id;
	
	private String roomType;
	
	private BigDecimal roomPrice;
	
	private boolean isBooked;
	
	private String photo;

	 private List<BookingResponse> bookings;

	public RoomResponse(long id, String roomType, BigDecimal roomPrice) {
		super();
		this.id = id;
		this.roomType = roomType;
		this.roomPrice = roomPrice;
	}


	@SuppressWarnings("deprecation")
	public RoomResponse(long id, String roomType, BigDecimal roomPrice, boolean isBooked, byte[] photoBytes
			) {
		super();
		this.id = id;
		this.roomType = roomType;
		this.roomPrice = roomPrice;
		this.isBooked = isBooked;
		this.photo = photoBytes!=null?Base64.encodeBase64String(photoBytes):null;
//		this.bookings = bookings;
	}
	
	 
	 
}
