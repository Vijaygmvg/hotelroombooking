package com.example.demo.repository;

import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.ResetPassword;

@Repository
public interface ResetPasswordRepository extends JpaRepository<ResetPassword,Long> {
	
	Optional<ResetPassword> findByToken(String token);

}
