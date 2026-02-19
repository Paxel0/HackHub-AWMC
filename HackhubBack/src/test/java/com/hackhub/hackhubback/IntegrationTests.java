package com.hackhub.hackhubback;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackhub.hackhubback.entity.Hackathon;
import com.hackhub.hackhubback.entity.User;
import com.hackhub.hackhubback.repository.HackathonRepository;
import com.hackhub.hackhubback.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional // Fondamentale: fa il rollback del DB dopo ogni test
class IntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HackathonRepository hackathonRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper; // Per convertire oggetti Java in JSON

    @BeforeEach
    void setup() {
        // Pulisce il DB prima di ogni test (grazie a @Transactional in realtà non serve svuotare, ma è safe)
        // Creiamo un utente di test nel DB reale (H2 o container test)
        if (userRepository.findByUsername("testuser").isEmpty()) {
            User user = new User();
            user.setUsername("testuser");
            user.setPassword(passwordEncoder.encode("password123")); // Password hashata
            user.setRole("USER");
            userRepository.save(user);
        }
    }

    @Test
    void testApiHackathons_ShouldReturn200() throws Exception {
        mockMvc.perform(get("/api/hackathons"))
               .andExpect(status().isOk());
    }

    @Test
    void testLogin_Success() throws Exception {
        // Prepariamo il body della richiesta
        Map<String, String> loginRequest = new HashMap<>();
        loginRequest.put("username", "testuser");
        loginRequest.put("password", "password123");

        // Eseguiamo la POST /api/auth/login
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest))) // Converte mappa in JSON string
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists()); // Verifica che torni un campo "token"
    }

    @Test
    void testLogin_Failure_WrongPassword() throws Exception {
        Map<String, String> loginRequest = new HashMap<>();
        loginRequest.put("username", "testuser");
        loginRequest.put("password", "wrongpassword");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized()); // O 401/403 a seconda della tua config
    }

    @Test
    void testJoinHackathon_Success() throws Exception {
        // 1. Creiamo un Hackathon al volo
        Hackathon h = new Hackathon();
        h.setName("Java Hackathon");
        h.setDescription("Code cool stuff");
        h.setStartDate(LocalDate.now());
        h.setEndDate(LocalDate.now().plusDays(2));
        Hackathon savedHackathon = hackathonRepository.save(h);

        // 2. Facciamo login per prendere il Token
        String token = ottieniTokenLogin("testuser", "password123");

        // 3. Chiamiamo l'API protetta di iscrizione passando il Token
        // Assumo che l'URL sia /api/hackathons/{id}/join o /api/users/subscribe/{id}
        // Adatta l'URL sotto in base al tuo Controller!
        mockMvc.perform(post("/api/hackathons/" + savedHackathon.getId() + "/join") 
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    // Metodo helper per fare login e estrarre il token
    private String ottieniTokenLogin(String username, String password) throws Exception {
        Map<String, String> loginRequest = new HashMap<>();
        loginRequest.put("username", username);
        loginRequest.put("password", password);

        MvcResult result = mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andReturn();
        
        String responseContent = result.getResponse().getContentAsString();
        // Estrae il valore del campo "token" dal JSON di risposta
        return objectMapper.readTree(responseContent).get("token").asText();
    }
}