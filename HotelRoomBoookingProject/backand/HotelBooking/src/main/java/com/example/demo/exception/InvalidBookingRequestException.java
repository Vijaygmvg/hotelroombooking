package com.example.demo.exception;

import javax.management.relation.InvalidRelationIdException;

public class InvalidBookingRequestException extends RuntimeException{

	public InvalidBookingRequestException(String message) {
		super(message);
	}
	
}
