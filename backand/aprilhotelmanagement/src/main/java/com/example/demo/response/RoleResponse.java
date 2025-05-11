package com.example.demo.response;

import com.example.demo.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoleResponse {

	long id;
	
	String name;
	
	public RoleResponse(Role role) {
		
		this.id=role.getId();
		this.name=role.getName();
		
	}
	
}
