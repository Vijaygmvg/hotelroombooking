package com.example.demo.service;

import java.io.IOException;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

import javax.sql.rowset.serial.SerialException;

import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Room;

public interface RoomService {
	
	Room AddNewRoom(MultipartFile photo,String roomType,BigDecimal roomPrice) throws IOException, SerialException, SQLException;
    List<String> getAllRoomTypes();
    
    List<Room> getAllRooms();
    
    public byte[] getRoomPhotoByRoomId(long id) throws SQLException;
    
    public void deleteRoom(Long roomId);
    
	public Room getRoomByRoomId(Long roomId) throws SQLException;
	
	
	boolean updateRoom(Long roomId, String roomType, BigDecimal roomPrice, MultipartFile photo) throws IOException, SerialException, SQLException;
	List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType);
     
	
}
