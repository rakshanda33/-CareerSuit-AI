package com.example.loginbackend.controller;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.loginbackend.model.user;
import com.example.loginbackend.repository.UserRepository;
import com.example.loginbackend.security.JwtService;

import java.util.Map;

@RestController
@CrossOrigin
public class LoginController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public LoginController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public Map<String, Object> login(
            @RequestBody Map<String, String> data
    ) {

        String email = data.get("email");
        String password = data.get("password");

        user existingUser = userRepository.findByEmail(email);

        // Debug logs
        System.out.println("Email received: " + email);

        if (existingUser == null) {
            System.out.println("User not found");
        }

        // Verify password using BCrypt
        if (existingUser != null &&
                passwordEncoder.matches(
                        password,
                        existingUser.getPassword()
                )) {

            // Generate JWT token
            String token =
                    jwtService.generateToken(existingUser.getEmail());

            return Map.of(
                    "success", "true",
                    "message", "Login Successful",
                    "token", token,
                    "userId", existingUser.getId(),
                    "name", existingUser.getName(),
                    "email", existingUser.getEmail()
            );
        }

        return Map.of(
                "success", "false",
                "message", "Invalid Credentials"
        );
    }
}