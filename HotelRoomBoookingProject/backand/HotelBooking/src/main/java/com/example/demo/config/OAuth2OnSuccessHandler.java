package com.example.demo.config;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.jwt.JwtUtils;
import com.example.demo.security.user.HotelUserDetails;
import com.example.demo.service.UserService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2OnSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final UserService userService;
    private final JwtUtils jwtUtils;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final String frontendUrl = "http://localhost:3000";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws ServletException, IOException {

        OAuth2AuthenticationToken oauth2Token = (OAuth2AuthenticationToken) authentication;
        DefaultOAuth2User oauth2User = (DefaultOAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oauth2User.getAttributes();
        for(String a:attributes.keySet()) {
        	System.out.println(a+"  "+attributes.get(a));
        	
        }

        String registrationId = oauth2Token.getAuthorizedClientRegistrationId(); // "google" or "github"

        String email = Optional.ofNullable(attributes.get("email"))
                               .map(Object::toString)
                               .orElse(null);
        if (email == null) {
            response.sendRedirect(frontendUrl + "/login?error=no_email");
            return;
        }

        String username = switch (registrationId) {
            case "github" -> attributes.getOrDefault("login", "").toString();
            case "google" -> email.split("@")[0];
            default -> "user";
        };

        String idAttributeKey = registrationId.equals("google") ? "sub" : "id";

        User user;
        try {
            user = userService.getUser(email);
        } catch (Exception e) {
            // Register new user if not found
            Role defaultRole = roleRepository.findByName("ROLE_USER")
                                             .orElseThrow(() -> new RuntimeException("Default role not found"));

            user = new User();
            user.setEmail(email);
            user.setFirstName(username);
            user.setRoles(List.of(defaultRole));
            userRepository.save(user);
        }

        // Create new OAuth2User with updated roles
        List<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .toList();

        DefaultOAuth2User newOauth2User = new DefaultOAuth2User(authorities, attributes, idAttributeKey);
        OAuth2AuthenticationToken newAuth = new OAuth2AuthenticationToken(
                newOauth2User,
                authorities,
                registrationId
        );

        SecurityContextHolder.getContext().setAuthentication(newAuth);

        // Generate JWT token
        String jwtToken = jwtUtils.generateJwtTokenForHotelUserDetails(HotelUserDetails.buildUserDetails(user));

        // Redirect to frontend with token
        String targetUrl = UriComponentsBuilder.fromUriString(frontendUrl + "/oauth2/redirect")
                .queryParam("token", jwtToken)
                .build().toUriString();

        this.setAlwaysUseDefaultTargetUrl(true);
        this.setDefaultTargetUrl(targetUrl);
        super.onAuthenticationSuccess(request, response, newAuth);
    }
}
