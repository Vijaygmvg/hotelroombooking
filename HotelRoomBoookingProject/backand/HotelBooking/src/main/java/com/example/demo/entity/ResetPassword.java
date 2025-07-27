package com.example.demo.entity;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class ResetPassword {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	

    @Column(name = "token", nullable = false, unique = true)
	private String token;
	
    @Column
	private Instant cretedAt;
	
    @Column
	private Instant expiredAt;
	
    @Column
	private boolean isUsed;
	
    @Column
    private String userId;
    
    public boolean isExpired() {
    	return Instant.now().isAfter(expiredAt);	
    }
    
    public ResetPassword(String userId) {
    	this.token=UUID.randomUUID().toString();
    	this.userId=userId;
    	this.cretedAt=Instant.now();
    	this.expiredAt=Instant.now().plus(4,ChronoUnit.MINUTES);
    	this.isUsed=false;
    	
    }
    
	
	
	
}
