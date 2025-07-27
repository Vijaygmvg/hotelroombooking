package com.example.demo.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.sql.rowset.serial.SerialException;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.BookedRoom;
import com.example.demo.entity.Room;
import com.example.demo.exception.PhotoRetrivalException;
import com.example.demo.response.RoomResponse;
import com.example.demo.service.BookingService;
import com.example.demo.service.RoomService;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/room")
public class RoomController {
	
	private final RoomService roomService;
	
	private final BookingService bookingService;
	
	
	public RoomController(RoomService roomService,BookingService bookingService) {
		this.roomService=roomService;
		this.bookingService = bookingService;
	}
	@PostMapping("/add/new-room")

	public ResponseEntity<RoomResponse> addNewRoom(
			@RequestParam("photo")MultipartFile photo,
			@RequestParam("roomType")String roomType,
			@RequestParam("roomPrice")BigDecimal roomPrice)throws IOException, SerialException, SQLException{
		System.out.println("hited");
		System.out.println(roomType+roomPrice);
		if(photo!=null)System.out.println("photo is not null and "+photo.isEmpty());
		Room savedRoom=roomService.AddNewRoom(photo,roomType,roomPrice);
		RoomResponse response=new RoomResponse(savedRoom.getId(),savedRoom.getRoomType(),savedRoom.getRoomPrice());
		return ResponseEntity.ok(response);
	}
	
	@GetMapping
	public String hellotrkb() {
		return "true hello";
		
	}
	@GetMapping("/hello")
	public String hello() {
		
		System.out.println("this is hitted");
		return "hello good mornig";
	}
	
	@GetMapping("/hi")
	public String hellotwo() {
		return "helljknkjnvkjns";
	}
	@GetMapping("/room-types")
	public List<String> getRooomTypes(){
		
		            return roomService.getAllRoomTypes();
		
	}
	
	//this is the api which is used to get all the rooms
	
	@GetMapping("/all-rooms")
	public ResponseEntity<List<RoomResponse>> getAllRooms() throws SQLException{
		
		List<Room> rooms=roomService.getAllRooms();
		List<RoomResponse> roomResponses=new ArrayList<>();
		for(Room room:rooms) {
			byte[]  photoBytes=roomService.getRoomPhotoByRoomId(room.getId());
			if(photoBytes!=null&&photoBytes.length>0) {
				String base64Photo=Base64.encodeBase64String(photoBytes);
				RoomResponse roomResponse=getRoomResponse(room);
				roomResponse.setPhoto(base64Photo);
				roomResponses.add(roomResponse);
				
				
			}
			
		}
		return ResponseEntity.ok(roomResponses);
	}
	
	@DeleteMapping("/delete/room/{roomId}")
	
	public ResponseEntity<Void> deleteRoom(@PathVariable Long roomId){
		 roomService.deleteRoom(roomId);
		 return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		
	}
	@GetMapping("/room/{roomId}")
	
	public ResponseEntity<RoomResponse> getRoomByRoomId(@PathVariable Long roomId) throws SQLException{
		System.out.println("it is hitted ");
		Room room=roomService.getRoomByRoomId(roomId);
		RoomResponse roomResponse=getRoomResponse(room);
		return ResponseEntity.ok(roomResponse);
	}
	
	@PutMapping("/room/update/{roomId}")

	public ResponseEntity<Void> updateRoom(@RequestParam("roomType")String roomType,
			@RequestParam("roomPrice")BigDecimal roomPrice,
			@RequestParam("photo")MultipartFile photo,
			@PathVariable Long roomId) throws SerialException, IOException, SQLException{
		        System.out.println("it is in room update functioon");
		boolean result=roomService.updateRoom(roomId,roomType,roomPrice,photo);
		
		 return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		
		  
	}
	
	 @GetMapping("/available-rooms")
	public ResponseEntity<List<RoomResponse>> getAvailableRooms(
			@RequestParam("checkInDate")@DateTimeFormat(pattern = "yyyy-MM-dd")LocalDate checkInDate,
			@RequestParam("checkOutDate")@DateTimeFormat(pattern = "yyyy-MM-dd")LocalDate checkOutDate,
			@RequestParam("roomType") String roomType) throws SQLException{
		List<Room> availableRooms=roomService.getAvailableRooms(checkInDate,checkOutDate,roomType);
		List<RoomResponse> roomResponses=new ArrayList<>();
		System.out.println("giving the  all available rooms");
		for(Room room:availableRooms) {
			byte[] photoByte=roomService.getRoomPhotoByRoomId(room.getId());
			if(photoByte!=null&&photoByte.length>0) {
				String photoBase64=Base64.encodeBase64String(photoByte);
				RoomResponse roomResponse=getRoomResponse(room);
				roomResponse.setPhoto(photoBase64);
				roomResponses.add(roomResponse);
				
				
			}
		}
		if(roomResponses.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		else {
			return ResponseEntity.ok(roomResponses);
		}
		
		
		
		
	}
	

	
	
	
	
	
	private RoomResponse getRoomResponse(Room room) {
		List<BookedRoom> bookings=getAllBookingsByRoomId(room.getId());
//		List<BookingResponse> bookingInfo=bookings.
//				    stream().
//				    map(booking->new BookingResponse(booking.getBookingId(),booking.getCheckIndate(),booking.getCheckOutDate(),booking.getBookingConfirmationCode())).toList();
		byte[] photoBytes=null;
		Blob photoBlob=room.getPhoto();
		if(photoBlob!=null) {
			try{
				  photoBytes=photoBlob.getBytes(1,(int)photoBlob.length());
			}
			catch(SQLException e) {
				throw new PhotoRetrivalException("Erro retriving  photo");
				
				
			}
		}	
		return new RoomResponse(room.getId(),room.getRoomType(),room.getRoomPrice(),room.isBooked(),photoBytes);
		
	}
	private List<BookedRoom> getAllBookingsByRoomId(Long roomId){
		
		 return bookingService.getAllBookingsByRoomId(roomId);
	}

}
