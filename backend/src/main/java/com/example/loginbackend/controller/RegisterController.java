package com.example.loginbackend.controller;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.loginbackend.model.user;
import com.example.loginbackend.repository.UserRepository;

import java.util.Map;

@RestController
@CrossOrigin
public class RegisterController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public RegisterController(UserRepository userRepository,
                              PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public Map<String, String> register(
            @RequestBody Map<String, String> data
    ) {

        String name = data.get("name");
        String email = data.get("email");
        String password = data.get("password");

        // Check if email already exists
        user existingUser = userRepository.findByEmail(email);

        if (existingUser != null) {

            return Map.of(
                    "success", "false",
                    "message", "Email already exists"
            );
        }

        // Encrypt (hash) the password before saving
        String encodedPassword = passwordEncoder.encode(password);

        // Create new user with hashed password
        user newUser = new user(
                name,
                email,
                encodedPassword
        );

        // Save user to database
        userRepository.save(newUser);

        return Map.of(
                "success", "true",
                "message", "Registration Successful"
        );
    }
}