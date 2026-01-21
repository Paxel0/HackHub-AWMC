package com.hackhub.hackhubback.config;

import com.hackhub.hackhubback.entity.User;
import com.hackhub.hackhubback.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner seedUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String username = "admin";
            String rawPassword = "admin123";

            // Se l'utente non esiste nel DB (utile al primo avvio su un DB nuovo), lo creiamo.
            if (userRepository.findByUsername(username).isEmpty()) {
                User u = new User();
                u.setUsername(username);
                u.setPassword(passwordEncoder.encode(rawPassword));
                u.setRole("utente");
                userRepository.save(u);
                System.out.println("Utente admin creato con successo.");
            }
        };
    }
}

