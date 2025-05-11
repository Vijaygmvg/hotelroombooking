package com.example.demo.service;import java.util.Collections;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.exception.UserAlreadyExistException;
import com.example.demo.exception.UserNameNotFoundException;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final RoleRepository roleRepository;

	@Override
	public User registerUser(User user) {
		if(userRepository.existsByEmail(user.getEmail())) {
			throw new UserAlreadyExistException("the user already exist with the give email ID");
		}
		System.out.println("user is not exist");
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		Role userRole=roleRepository.findByName("ROLE_USER").get();
        System.out.println(userRole.getId()+"  "+userRole.getName());
		user.setRoles(Collections.singleton(userRole));
		System.out.println("it is coome to here ");
		return  userRepository.save(user);
	}

	@Override
	public List<User> getUsers() {
	          return  userRepository.findAll();
		
		
	}

	@Transactional
	@Override
	public void deleteUser(String email) {
		User theUser=getUser(email);
		if(theUser!=null)
		userRepository.deleteByEmail(email);
		
	}

	@Override
	public User getUser(String email) {
		System.out.println("this is getting searching "+userRepository.findByEmail(email).get().getEmail());
		
		return userRepository.findByEmail(email).orElseThrow(()-> new UserNameNotFoundException("user not found "));
		
	}

}
