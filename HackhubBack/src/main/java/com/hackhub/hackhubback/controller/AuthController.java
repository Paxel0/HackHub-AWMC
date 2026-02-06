package com.hackhub.hackhubback.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackhub.hackhubback.DTO.LoginRequest;
import com.hackhub.hackhubback.entity.User;
import com.hackhub.hackhubback.securityJWT.JwtUtils;
import com.hackhub.hackhubback.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;

@Valid
@RestController
@RequestMapping("/api")
public class AuthController {

    private final JwtUtils jwtUtils;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    // Rimosso AuthenticationManager perché non usato nella logica manuale qui sotto
    public AuthController(JwtUtils jwtUtils, UserService userService, PasswordEncoder passwordEncoder) {
        this.jwtUtils = jwtUtils;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        // Verifica che userService non ritorni null o lanci eccezioni
        User user = userService.findIdByUsername(loginRequest.getUsername());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Utente non trovato");
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Password errata");
        }

        // Genera il token
        String token = jwtUtils.generateToken(user.getUsername());

        Map<String, String> body = new HashMap<>();
        body.put("token", token);
        body.put("username", user.getUsername());
        body.put("role", user.getRole() == null ? "" : user.getRole());

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .body(body);
    }
}
