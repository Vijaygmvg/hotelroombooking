package com.example.demo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Room;

public interface RoomRepository extends JpaRepository<Room,Long>{
 
	@Query("SELECT  DISTINCT r.roomType FROM Room r")
	List<String> findDistinctRoomTypes();

	@Query("SELECT r FROM Room r " +
		       "WHERE r.roomType LIKE %:roomType% " +
		       "AND r.id NOT IN (" +
		           "SELECT br.room.id FROM BookedRoom br " +
		           "WHERE (br.checkInDate <= :checkOutDate AND br.checkOutDate >= :checkInDate)" +
		       ")")
	
	List<Room> findAvailableRoomsByDateAndTIme(LocalDate checkInDate, LocalDate checkOutDate, String roomType);
	
	
}

