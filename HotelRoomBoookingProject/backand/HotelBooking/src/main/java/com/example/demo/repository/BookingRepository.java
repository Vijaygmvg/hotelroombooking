package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.BookedRoom;

import jakarta.persistence.Id;

public interface BookingRepository extends JpaRepository<BookedRoom,Long> {

	
	
	List<BookedRoom> findByRoomId(Long roomId);
	

	BookedRoom findByBookingConfirmationCode(String confirmationCode);


	List<BookedRoom> findByGuestEmail(String email);

}
