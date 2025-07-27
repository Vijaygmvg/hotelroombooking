package com.example.demo.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Room;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.RoomRetrivalException;
import com.example.demo.repository.RoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public   class RoomServiceImpl implements RoomService{
	private final RoomRepository roomRepository;

	@Override
	public Room AddNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice) throws IOException, SerialException, SQLException {
		
		
		Room room=new Room();
		room.setRoomType(roomType);
		room.setRoomPrice(roomPrice);
		if(!file.isEmpty()) {
			byte[] photBytes=file.getBytes();
			Blob photoBlob=new SerialBlob(photBytes);
			System.out.println(photoBlob);
			room.setPhoto(photoBlob);
			System.out.println(room.getPhoto());
			
			
		}
		return roomRepository.save(room);
	}
	public List<String> getAllRoomTypes(){
		return roomRepository.findDistinctRoomTypes();
		
		
	}
	@Override
	public List<Room> getAllRooms(){
		
		return roomRepository.findAll();
	}
	
	public byte[] getRoomPhotoByRoomId(long id) throws SQLException {
		
		Optional<Room> theRoom=roomRepository.findById(id);
		if(theRoom.isEmpty()) {
			throw new ResourceNotFoundException("soory room not found ");
		}
		Blob photoBlob=theRoom.get().getPhoto();
		if(photoBlob!=null) {
			return photoBlob.getBytes(1,(int)photoBlob.length());
		}
		return null;
	}
	
	@Override
	public void deleteRoom(Long roomId)  {
		Optional<Room> theRoom=roomRepository.findById(roomId);
		if(theRoom.isPresent()) {
			roomRepository.deleteById(roomId);
			
			
		}
		
		
	}
	@Override
	public Room getRoomByRoomId(Long roomId)  throws SQLException{
		
		Optional<Room> theRoom=roomRepository.findById(roomId);
		if(theRoom.isPresent()) {
			return theRoom.get();
		}
		else {
			
			throw new RoomRetrivalException("the room id room is not existing ");
		}
		
	}
	
	@Override
	public boolean updateRoom(Long roomId, String roomType, BigDecimal roomPrice, MultipartFile file) throws IOException, SerialException, SQLException {
		 Room room=getRoomByRoomId(roomId);
		 room.setRoomType(roomType);
		 room.setRoomPrice(roomPrice);
		 if(!file.isEmpty()) {
				byte[] photBytes=file.getBytes();
				Blob photoBlob=new SerialBlob(photBytes);
				
				room.setPhoto(photoBlob);
				
				
				
		 }
		 roomRepository.save(room);
		 
		 
		return true;
	}
	@Override
	public List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
		return roomRepository.findAvailableRoomsByDateAndTIme(checkInDate,checkOutDate,roomType);
	}
	

}
