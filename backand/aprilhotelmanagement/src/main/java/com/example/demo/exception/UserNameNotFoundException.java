package com.example.demo.exception;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserNameNotFoundException extends RuntimeException {

	public UserNameNotFoundException(String message) {
		super(message);
	}

}
