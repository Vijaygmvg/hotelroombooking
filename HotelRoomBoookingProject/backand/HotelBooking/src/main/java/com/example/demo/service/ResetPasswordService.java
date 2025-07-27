package com.example.demo.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.demo.entity.ResetPassword;
import com.example.demo.entity.User;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.TokenExpired;
import com.example.demo.repository.ResetPasswordRepository;
import com.example.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor
public class ResetPasswordService {
	
	private final SendEmail sendEmail;
	private final JavaMailSender javaMailSender;
	private final ResetPasswordRepository resetPasswordRepository;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	public boolean sendResetLink(String email) {
		
		String frontandUrl="http://localhost:3000/reset-password-link";
		ResetPassword resetPassword=new ResetPassword(email);
		resetPasswordRepository.save(resetPassword);
		
		String targetUrl = UriComponentsBuilder.fromUriString(frontandUrl)
                .queryParam("passwordToken", resetPassword.getToken())
                .build().toUriString();
		 String htmlContent = "<p>Hello,</p>"
	                + "<p>Click the link below to reset your password:</p>"
	                + "<a href=\"" + targetUrl + "\">Reset Password</a>"
	                + "<p>This link is valid for 4 minutes.</p>";
		 try {
                sendEmail.sendEmailWithLink(email, "reset  you  Account passord", htmlContent);
                System.out.println("the email is sent successfully ");
		
		 }
		 catch(Exception e) {
			 e.printStackTrace();
			 return false;
			 
		 }
		
		return true;
	}

	public void setNewPassword(String token, String password) throws ResourceNotFoundException {
		System.out.println("this is prefetch ");
		
		
	    ResetPassword resetPassword=resetPasswordRepository.findByToken(token).orElseThrow(()->new ResourceNotFoundException("invalid token not foun"));
	    if(resetPassword.isExpired()||resetPassword.isUsed())
	    {
	    	throw new TokenExpired("Token is expired ");
	    }
		String  userId=resetPassword.getUserId();
		System.out.println(userId);
		
	   User user=userRepository.findByEmail(userId).orElseThrow(()->new UsernameNotFoundException("the user is not foud "));
	   	System.out.println("before"+user.getPassword());
	   user.setPassword(passwordEncoder.encode(password));
	   System.out.print("after the change"+user.getPassword());
		userRepository.save(user);
		resetPassword.setUsed(true);
		resetPasswordRepository.save(resetPassword);
		
		
	}

}
