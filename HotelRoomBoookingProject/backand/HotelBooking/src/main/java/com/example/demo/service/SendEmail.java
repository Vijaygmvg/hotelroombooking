package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;


@Service
public class SendEmail {
	
	  @Autowired
	    private JavaMailSender mailSender;

	    public void sendSimpleMail(String toEmail, String subject, String body) {
	        SimpleMailMessage message = new SimpleMailMessage();

	        message.setTo(toEmail);
	        message.setSubject(subject);
	        message.setText(body);
	        // Optional, but recommended

	        mailSender.send(message);
	        System.out.println("Mail sent successfully to " + toEmail);
	    }
	    
	    public void sendEmailWithLink(String toEmail,String subject,String body) throws MessagingException {
	        MimeMessage mimeMessage = mailSender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,true);
	        helper.setSubject(subject);
	        helper.setTo(toEmail);
	        helper.setText(body,true);
	        
	        System.out.println("the final step");
	        mailSender.send(mimeMessage);
	        System.out.println("the email is sneding "+toEmail);
	     // Optional, but recommended

	        
	    }

}
