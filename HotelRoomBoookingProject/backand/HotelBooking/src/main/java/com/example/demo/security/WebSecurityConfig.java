package com.example.demo.security;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.demo.config.OAuth2OnSuccessHandler;
import com.example.demo.security.jwt.AuthTokenFilter;
import com.example.demo.security.jwt.JwtAuthEntryPoint;
import com.example.demo.security.user.HotelUserDetailsService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Configuration


@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true,
        securedEnabled = true,
        jsr250Enabled = true)
@RequiredArgsConstructor
public class WebSecurityConfig {
	
	@Autowired
	private  HotelUserDetailsService userDeteailsService;
	
	@Autowired
	private  JwtAuthEntryPoint jwtAuthEntryPoint;
	
	@Autowired
	@Lazy
	private  OAuth2OnSuccessHandler oAuth2OnSuccessHandler;
	

    
	
	@Bean
	public AuthTokenFilter authenticationTokenFilter() {
		return new AuthTokenFilter();
	}
	
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
	 var authProvider=new DaoAuthenticationProvider(); 
	 authProvider.setUserDetailsService(userDeteailsService);
	 authProvider.setPasswordEncoder(passwordEncoder());
	 return authProvider;
	}
	
	
	
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
	
	return authConfig.getAuthenticationManager();
}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http, ClientRegistrationRepository clientRegistrationRepository) throws Exception {
	    http.csrf(AbstractHttpConfigurer::disable)
	        .exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthEntryPoint))
	        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	        .authorizeHttpRequests(auth -> auth
	            .requestMatchers("/auth/**", "/room/**", "/bookings/**", "/error","/users/**","/actuator/**").permitAll()
	            .requestMatchers("/roles/**").hasRole("ADMIN")
	            .anyRequest().authenticated())
	        .oauth2Login(oauth2 -> oauth2
	            .authorizationEndpoint(config -> config
	                .authorizationRequestResolver(
	                    customAuthorizationRequestResolver(clientRegistrationRepository)
	                )
	            )
	            .successHandler(oAuth2OnSuccessHandler)
	            .failureUrl("/login?error=true")
	        );

	    http.authenticationProvider(authenticationProvider());
	    http.addFilterBefore(authenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class);
	    return http.build();
	}
	private OAuth2AuthorizationRequestResolver customAuthorizationRequestResolver(
	        ClientRegistrationRepository clientRegistrationRepository) {

	    DefaultOAuth2AuthorizationRequestResolver defaultResolver =
	            new DefaultOAuth2AuthorizationRequestResolver(clientRegistrationRepository, "/oauth2/authorization");

	    return new OAuth2AuthorizationRequestResolver() {
	        @Override
	        public OAuth2AuthorizationRequest resolve(HttpServletRequest request) {
	            OAuth2AuthorizationRequest originalRequest = defaultResolver.resolve(request);
	            return customizeAuthorizationRequest(originalRequest);
	        }

	        @Override
	        public OAuth2AuthorizationRequest resolve(HttpServletRequest request, String clientRegistrationId) {
	            OAuth2AuthorizationRequest originalRequest = defaultResolver.resolve(request, clientRegistrationId);
	            return customizeAuthorizationRequest(originalRequest);
	        }

	        private OAuth2AuthorizationRequest customizeAuthorizationRequest(OAuth2AuthorizationRequest originalRequest) {
	            if (originalRequest == null) return null;

	            Map<String, Object> additionalParams = new HashMap<>(originalRequest.getAdditionalParameters());
	            additionalParams.put("prompt", "select_account");

	            return OAuth2AuthorizationRequest.from(originalRequest)
	                    .additionalParameters(additionalParams)
	                    .build();
	        }
	    };
	}



	
	

}
