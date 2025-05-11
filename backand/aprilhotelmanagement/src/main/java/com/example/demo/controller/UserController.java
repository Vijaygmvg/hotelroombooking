package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
	
	private  final UserService userService;
	
	@GetMapping("/all-users")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<List<User>> getusers(){
		 System.out.println("it is all users ");
		 
	  return  new ResponseEntity<>(userService.getUsers(),HttpStatus.OK);
	}
	
	@GetMapping("/{email}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> getUserByEmail(@PathVariable("email") String email){
		System.out.println("it is in the user finding route ");
		try {
			User theUser=userService.getUser(email);
			System.out.println(theUser.getFirstName()+" "+theUser.getRoles().size());
			return ResponseEntity.ok(theUser);
		}
		catch(UsernameNotFoundException e) {
			
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
			
		}
		catch(Exception e) {
			System.out.println("error in one exception ");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
	}
	@DeleteMapping("/delete/{email}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') and #email==principal.username")
	public ResponseEntity<String> deleteUser(@PathVariable String email){
		
		try {
			userService.deleteUser(email);
			return ResponseEntity.ok("User deleted successfully ");
		}
		catch(UsernameNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
			
			
		}
		
		
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("error in deleting user");
		}
		
		
	}
	
	

}
