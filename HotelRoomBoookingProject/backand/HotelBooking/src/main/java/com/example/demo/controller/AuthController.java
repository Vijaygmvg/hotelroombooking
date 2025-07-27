package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.exception.TokenExpired;
import com.example.demo.exception.UserAlreadyExistException;
import com.example.demo.request.LoginRequest;
import com.example.demo.response.JwtResponse;
import com.example.demo.security.jwt.JwtUtils;
import com.example.demo.security.user.HotelUserDetails;
import com.example.demo.service.ResetPasswordService;
import com.example.demo.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
	
	private final UserService userService;
	private final AuthenticationManager authenticationManager;
	private final JwtUtils jwtUtils;
	private final ResetPasswordService resetPasswordService;
	
	@PostMapping("/register-user")
	public ResponseEntity<?> registerUser(@RequestBody User user){
		try {
		
			System.out.println("it is come and hitted ");
			System.out.println(user.getEmail()+"  "+user.getPassword());
			  userService.registerUser(user);
			  return ResponseEntity.ok("registration successfull!");
		}
		catch(UserAlreadyExistException e) {
            
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request){
	
		
		Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt=jwtUtils.generateJwtTokenForUser(authentication);
		
		HotelUserDetails userDetails=(HotelUserDetails)authentication.getPrincipal();
		
		List<String> roles=userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
		return ResponseEntity.ok(new JwtResponse(
				userDetails.getId(),
				userDetails.getEmail(),
				jwt,
				roles));
	}
	
	@PostMapping("/reset-password")
	public ResponseEntity<?> resetPssword(@RequestParam String email){
		System.out.println(email);
		
		User user;
		try {
		 user=userService.getUser(email);
		}
		catch(Exception e) {
			return new ResponseEntity<>("the given user is not found enter the right email or crete acoount for this email",HttpStatus.NOT_FOUND);
			
		}
		boolean result=resetPasswordService.sendResetLink(user.getEmail());
		if(result) {
			return new ResponseEntity<>("ResetLink Sent to your eamil chack it once ",HttpStatus.OK);
		}
		//jfie bvsv lxxs lzrr
	    return new ResponseEntity<>("error in sendingplzz try aguan ",HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping("/set-new-password")
	public ResponseEntity<?> setNewPassword(@RequestParam String token, @RequestParam String password){
		
              try {
            	  resetPasswordService.setNewPassword(token,password);
              }
              catch(TokenExpired e) {
            	  return new ResponseEntity<>(e.getMessage(),HttpStatus.IM_USED);
            	  
              }
              catch(Exception e ) {
            	  return new ResponseEntity<>("Error in password changine ",HttpStatus.NOT_FOUND);
            	  
              }
		return new ResponseEntity<>("Password change succcesfuly",HttpStatus.OK);
		
		
	}
	
	

}
