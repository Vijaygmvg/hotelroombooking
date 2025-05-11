package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;

public interface RoleService {
	

	List<Role> getRoles();
	
	Role createRole(Role theRole);
	
	void deleteRole(long id);
	
	Role findByName(String name);
	
	User remooveUserFromRole(Long userId,Long roleId);
	
	User assaignRoleToUser(Long userId,Long roleId);
	
	Role removeAllUsersFromRole(Long roleId);
	
}
