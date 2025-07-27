package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Payment;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.PaymentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {
	
	private final PaymentRepository paymentRepository;
	
	public Payment getPayment(Long paymentId) {
		
		return paymentRepository.findById(paymentId).get();
		
	}

	
	
	
	

}
