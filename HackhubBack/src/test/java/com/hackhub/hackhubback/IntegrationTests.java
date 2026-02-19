package com.hackhub.hackhubback;

import com.hackhub.hackhubback.controller.HackathonController;
import com.hackhub.hackhubback.repository.HackathonRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class IntegrationTests {

    @Autowired
    private HackathonController hackathonController;

    @Autowired
    private HackathonRepository hackathonRepository;

    @Test
    void controllerShouldBeLoaded() {
        // Verifica che il Controller Web sia attivo
        assertThat(hackathonController).isNotNull();
    }

    @Test
    void repositoryShouldBeLoaded() {
        // Verifica che il Repository (Connessione DB) sia attivo
        assertThat(hackathonRepository).isNotNull();
        
        // Verifica extra opzionale: il DB deve rispondere con una lista (anche vuota)
        // Se esplode qui, vuol dire che la connessione al DB è rotta
        assertThat(hackathonRepository.findAll()).isNotNull();
    }
}