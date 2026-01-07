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

            // H2 in-memory: ad ogni avvio è vuoto, quindi reinseriamo l'utente se non c'è.
            if (userRepository.findByUsername(username).isEmpty()) {
                User u = new User();
                u.setUsername(username);
                u.setPassword(passwordEncoder.encode(rawPassword));
                // Assicurati che il ruolo sia gestito (es. default nella entity o settato qui)
                u.setRole("utente");
                userRepository.save(u);
                System.out.println("Utente admin creato con successo.");
            }
        };
    }
}

