package com.ecommerce.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.UserDTO;
import com.ecommerce.dto.UserRequestDTO;
import com.ecommerce.security.JwtUtil;
import com.ecommerce.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@Valid @RequestBody UserRequestDTO dto) {
        return ResponseEntity.status(201).body(userService.register(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserRequestDTO dto) {

        UserDTO user = userService.login(dto.getEmail(), dto.getPassword());

        String token = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(
            Map.of(
                "token", token,
                "user", user
            )
        );
    }

}