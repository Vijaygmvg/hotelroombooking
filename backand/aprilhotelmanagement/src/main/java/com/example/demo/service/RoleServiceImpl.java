package com.example.demo.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.RoleAlreadyExistException;
import com.example.demo.exception.UserAlreadyExistException;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
	
	private final RoleRepository roleRepository;
	private final UserService userService;
    private final UserRepository userRepository;
  
    
	@Override
	public List<Role> getRoles() {
		System.out.println("it is in in the rol service class ");
		System.out.println(roleRepository.findAll().size());
		return roleRepository.findAll();
	}

	@Override
	public Role createRole(Role theRole) {
		
		String roleName="Role_"+theRole.getName().toUpperCase();
		Role role=new Role(roleName);
		if(roleRepository.existsByName(roleName)) {
			throw new RoleAlreadyExistException("the given name role is already existed");
			
		}
		return roleRepository.save(role);
	}

	@Transactional
	@Override
	public void deleteRole(long roleId) {
		
		 this.removeAllUsersFromRole(roleId);
		 roleRepository.deleteById(roleId);
		 
	}

	@Override
	public Role findByName(String name) {
		
		return roleRepository.findByName(name).get();
	}

	@Transactional
	@Override
	public User remooveUserFromRole(Long userId, Long roleId) {
		 
		Optional<User> user=userRepository.findById(userId);
		Optional<Role> role=roleRepository.findById(roleId);
		if(user.isPresent()&&role.isPresent()&&role.get().getUsers().contains(user.get())) {
			role.get().removeUserFromRole(user.get());
			roleRepository.save(role.get());
			return user.get();
			
		}
		throw new  UsernameNotFoundException("the given user is not found ");
		 
		
	}

	@Transactional
	@Override
	public User assaignRoleToUser(Long userId, Long roleId) throws ResourceNotFoundException{
		 Optional<User> user=userRepository.findById(userId);
		 Optional<Role> role=roleRepository.findById(roleId);
		 if(!role.isPresent()) {
		    throw new  ResourceNotFoundException("the given role id is not present ");
		 }
		 if(!user.isPresent()) {
			    throw new  ResourceNotFoundException("the given user id is not present ");
			 }
		 if(user.isPresent()&&user.get().getRoles().contains(role.get())) {
			 throw new UserAlreadyExistException(user.get().getFirstName()+" is already assigned to the role  "+role.get().getName());
		  }
		 if(role.isPresent()) {
			 role.get().assignRoleToUser(user.get());
			 roleRepository.save(role.get());
			 
		 }
		 
		 
		 return user.get();
		 
	}

	@Transactional
	@Override
	public Role removeAllUsersFromRole(Long roleId)  {
		Optional <Role> role=roleRepository.findById(roleId);
		role.get().removeAllUsersFromRole();
		return roleRepository.save(role.get());
	}

}
