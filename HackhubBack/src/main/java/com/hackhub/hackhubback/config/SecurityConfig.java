package com.hackhub.hackhubback.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Necessario per Angular
                .authorizeHttpRequests(auth -> auth
                        // Lascia passare le richieste di login (pubbliche)
                        // Aggiusta "/auth/login" in base al RequestMapping del tuo Controller
                        .requestMatchers("/login", "/error").permitAll()
                        // Blocca tutto il resto se l'utente non è autenticato
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form.disable()); // Disabilita form di default

        return http.build();
    }
}
