package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.User;

public interface UserRepository extends JpaRepository<User,Long>{

	

	  public boolean existsByEmail(String email);

	public void deleteByEmail(String email);

	public Optional<User> findByEmail(String email);

}
