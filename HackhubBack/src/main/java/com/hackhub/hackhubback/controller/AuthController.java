package com.hackhub.hackhubback.controller;

import org.springframework.web.bind.annotation.RestController;

import com.hackhub.hackhubback.DTO.LoginRequest;
import com.hackhub.hackhubback.entity.User;
import com.hackhub.hackhubback.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;


@RestController
public class AuthController {
    @Autowired
private UserService userService;
@Autowired
private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        
        User user = userService.findIdByUsername(loginRequest.getUsername());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Utente non trovato");
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Password errata");
        }


        Map<String, String> body = new HashMap<>();
        body.put("username", user.getUsername());
        body.put("role", user.getRole() == null ? "" : user.getRole());

        return ResponseEntity.ok(body);
    }
}
