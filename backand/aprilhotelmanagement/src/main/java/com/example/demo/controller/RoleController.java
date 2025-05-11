package com.example.demo.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.RoleAlreadyExistException;
import com.example.demo.response.RoleResponse;
import com.example.demo.service.RoleService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/roles")
public class RoleController {
	
	private final RoleService roleService;
	
	@GetMapping("/all")
	public ResponseEntity<List<Role>> getAllRoles(){
		
		 List<Role> roles=roleService.getRoles();
		
		return new ResponseEntity<>(roles,HttpStatus.FOUND);
	}
	
	@PostMapping("/create-new-role")
	public ResponseEntity<String> createRole(@RequestBody Role theRole){
		
		try {
			roleService.createRole(theRole);
			return ResponseEntity.ok("New Role is created successfuly!");
		}
		catch(RoleAlreadyExistException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
			
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error occuredd ");
		}
		
	}
	
	@DeleteMapping("/delete/{roleId}")
	public void deleteRole(@PathVariable("roleId")Long roleId) {
		
		roleService.deleteRole(roleId);
	}
	
	@PostMapping("/removeall-user-from-role/{roleId}")
	public Role removeAllUsersFromRole(@PathVariable("roleId") Long roleId) {
		return roleService.removeAllUsersFromRole(roleId);
	}
	
	
	@PostMapping("/remove-user-from-role")
	public User removeUserFromRole(@RequestParam("userId") Long userId,@RequestParam("roleId") Long roleId) {
		
		return roleService.remooveUserFromRole(userId, roleId);
	}
	
	@PostMapping("/assign-user-to-role")
   public ResponseEntity<?> assignUserToRole(@RequestParam("userId") Long userId,@RequestParam("roleId") Long roleId) {
		
		try {
		User user= roleService.assaignRoleToUser(userId, roleId);
		return new ResponseEntity<>(user,HttpStatus.OK);
		
		}
		catch(Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
			
		}
	}
	

}
