package com.example.demo.exception;

public class TokenExpired  extends RuntimeException {
	
	public TokenExpired(String message) {
		super(message);
	}

}
