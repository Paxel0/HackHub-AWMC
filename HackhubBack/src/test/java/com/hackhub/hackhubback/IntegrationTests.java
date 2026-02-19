package com.hackhub.hackhubback;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackhub.hackhubback.entity.User;
import com.hackhub.hackhubback.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional // Esegue il rollback del DB dopo ogni test per tenerlo pulito
class IntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setup() {
        // Pulizia e creazione utente per il test
        // Se nel DB di test l'utente esiste già, lo rimuoviamo per evitare duplicati
        userRepository.deleteAll();

        User testUser = new User();
        testUser.setUsername("testuser");
        // Importante: La password salvata nel DB deve essere criptata
        testUser.setPassword(passwordEncoder.encode("password123")); 
        testUser.setRole("USER");
        
        userRepository.save(testUser);
    }

    @Test
    void testLogin_Success() throws Exception {
        // 1. Prepariamo il payload JSON per la richiesta di login
        Map<String, String> loginRequest = new HashMap<>();
        loginRequest.put("username", "testuser");
        loginRequest.put("password", "password123"); // Password in chiaro inviata dal client

        // 2. Eseguiamo la simulazione della chiamata POST
        mockMvc.perform(post("/api/auth/login") // Assicurati che questo sia l'URL corretto del tuo Controller
                .contentType(MediaType.APPLICATION_JSON) // Diciamo che inviamo JSON
                .content(objectMapper.writeValueAsString(loginRequest))) // Convertiamo la mappa in stringa JSON
                
        // 3. Verifichiamo la risposta
                .andExpect(status().isOk()) // Ci aspettiamo HTTP 200 OK
                .andExpect(jsonPath("$.token").exists()) // Ci aspettiamo che il JSON contenga il campo "token"
                .andExpect(jsonPath("$.username").value("testuser")); // Opzionale: verifica altri campi risposta
    }

    @Test
    void testLogin_Failure_WrongPassword() throws Exception {
        Map<String, String> loginRequest = new HashMap<>();
        loginRequest.put("username", "testuser");
        loginRequest.put("password", "passwordSbagliata");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized()); // O isForbidden() / 401 / 403 a seconda della tua config
    }
}