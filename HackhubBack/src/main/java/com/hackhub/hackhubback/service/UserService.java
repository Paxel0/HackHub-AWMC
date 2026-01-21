package com.hackhub.hackhubback.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hackhub.hackhubback.entity.User;
import com.hackhub.hackhubback.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public User findIdByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    // 2. Metodo OBBLIGATORIO per Spring Security
    // Quando fai login, Spring chiama AUTOMATICAMENTE questo metodo
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Cerca l'utente nel DB usando il tuo metodo o direttamente la repository
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utente non trovato: " + username));

        // Converte il tuo "User" (Entity del DB) in un "UserDetails" (Oggetto di Spring Security)
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword()) // Passa la password hashata dal DB
                .roles(user.getRole())        // Passa il ruolo (es. "ADMIN", "USER")
                .build();

    }
}
