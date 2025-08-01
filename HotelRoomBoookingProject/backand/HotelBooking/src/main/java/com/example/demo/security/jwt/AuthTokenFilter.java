package com.example.demo.security.jwt;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.security.user.HotelUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AuthTokenFilter extends OncePerRequestFilter {

	
	@Autowired
	private  JwtUtils jwtUtils;
	
  @Autowired
	private  HotelUserDetailsService userDetailsService;
	
	
	private static final Logger logger=LoggerFactory.getLogger(AuthTokenFilter.class);
	@Override
	protected void doFilterInternal(HttpServletRequest request, 
			HttpServletResponse response,
			FilterChain filterChain)
			throws ServletException, IOException {
		
		  String path = request.getRequestURI();

		    // Skip JWT filter for public endpoints
		    
		
		try {
			String jwt=parseJwt(request);
			
			if(jwt!=null&&jwtUtils.validateToken(jwt)){
				String email=jwtUtils.getUserNameFromToken(jwt);
			     UserDetails userDetails=userDetailsService.loadUserByUsername(email);
			     var authentication=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
			     authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			     SecurityContextHolder.getContext().setAuthentication(authentication);
			    System.out.println("it is authenticated ");
			     
			}
			
		}
		catch(Exception e) {
			
	
			logger.error("Cannot set User Authentication :{}",e.getMessage());
			
		}
		filterChain.doFilter(request, response);
		
		
		
		
	}
	private String parseJwt(HttpServletRequest request) {
		String headerAuth=request.getHeader("Authorization");
		if(StringUtils.hasText(headerAuth)&&headerAuth.startsWith("Bearer")) {
			return headerAuth.substring(7);
		}
			return null;
	}
	
	

}
