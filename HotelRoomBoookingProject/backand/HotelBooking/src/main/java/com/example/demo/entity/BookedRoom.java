package com.example.demo.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookedRoom {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long bookingId;
	
	@Column(name="check_In")
	private LocalDate checkInDate;
	
	@Column(name="check_Out")
	private LocalDate checkOutDate;
	
	@Column(name="guest_FullName")
	private String guestFullName;
	
	@Column(name="guest_Email")
	private String guestEmail;
	
	@Column(name="adults")
	private int noOfAdults;
	
	@Column(name="children")
	private int noOfChildrens;
	
	@Column(name="total_Guest")
	private int totalNoOfGuest;
	
	@Column(name="confirmation_Code")
	private String bookingConfirmationCode;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="room_id")
	private Room room;
	
	public void calculateNoOfGuest() {
		this.totalNoOfGuest=this.noOfAdults+this.noOfChildrens; 
		
	}

	public void setNoOfAdults(int noOfAdults) {
		this.noOfAdults = noOfAdults;
		calculateNoOfGuest();
	}

	public void setNoOfChildrens(int noOfChildrens) {
		this.noOfChildrens = noOfChildrens;
		calculateNoOfGuest();
	}
	public void setBookingConfirmationCode(String bookingConfirmationCode) {
		this.bookingConfirmationCode=bookingConfirmationCode;
	}
	
	
	
	
	
	
	
	

}
