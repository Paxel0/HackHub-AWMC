package com.hackhub.hackhubback;

import com.hackhub.hackhubback.controller.HackathonController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class IntegrationTests {

    @Autowired
    private HackathonController hackathonController;

    @Test
    void applicationShouldStartAndControllerShouldBeLoaded() {
        // Verifica semplicissima:
        // Se Spring Boot si avvia e riesce a creare il controller,
        // allora hackathonController non sarà null.
        assertThat(hackathonController).isNotNull();
    }
}