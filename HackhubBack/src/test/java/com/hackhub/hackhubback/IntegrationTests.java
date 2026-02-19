package com.hackhub.hackhubback;

import com.hackhub.hackhubback.controller.HackathonController;
import com.hackhub.hackhubback.entity.Hackathon;
import com.hackhub.hackhubback.entity.User;
import com.hackhub.hackhubback.repository.HackathonRepository;
import com.hackhub.hackhubback.repository.UserRepository;
import com.hackhub.hackhubback.service.HackathonSubscriptionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class IntegrationTests {

    @Autowired
    private HackathonController hackathonController;

    @Autowired
    private HackathonRepository hackathonRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HackathonSubscriptionService subscriptionService;

    private User testUser;
    private Hackathon hackathon1;
    private Hackathon hackathon2;

    @BeforeEach
    void setUp() {
        // Pulisce il DB (opzionale grazie a @Transactional, ma utile per sicurezza)
        userRepository.deleteAll();
        hackathonRepository.deleteAll();

        // Crea un utente di test
        testUser = new User();
        testUser.setUsername("testuser");
        testUser.setPassword("password");
        testUser = userRepository.save(testUser);

        // Crea due hackathon di test
        hackathon1 = new Hackathon("Hackathon 1", "Desc 1", LocalDate.now(), LocalDate.now().plusDays(2), "Roma");
        hackathon1 = hackathonRepository.save(hackathon1);

        hackathon2 = new Hackathon("Hackathon 2", "Desc 2", LocalDate.now(), LocalDate.now().plusDays(2), "Milano");
        hackathon2 = hackathonRepository.save(hackathon2);
    }

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
        assertThat(hackathonRepository.findAll()).isNotNull();
    }

    @Test
    void shouldSubscribeSuccessfullyIfNotSubscribed() {
        // Act: L'utente si iscrive all'hackathon 1
        var result = subscriptionService.toggleSubscription(testUser.getUsername(), hackathon1.getId());

        // Assert
        assertThat(result.status()).isEqualTo(HackathonSubscriptionService.ToggleStatus.SUBSCRIBED);
        
        // Verifica chiamando il servizio (o repository) che l'utente sia iscritto
        // Nota: ricarichiamo l'utente dal DB perché l'istanza in memoria 'testUser' potrebbe non essere aggiornata
        User updatedUser = userRepository.findById(testUser.getId()).orElseThrow();
        assertThat(updatedUser.getSubscribedHackathon()).isNotNull();
        assertThat(updatedUser.getSubscribedHackathon().getId()).isEqualTo(hackathon1.getId());
    }

    @Test
    void shouldUnsubscribeIfAlreadySubscribedToSameHackathon() {
        // Arrange: L'utente è già iscritto all'hackathon 1
        subscriptionService.toggleSubscription(testUser.getUsername(), hackathon1.getId());
        
        // Act: L'utente clicca di nuovo (toggle) sullo stesso hackathon
        var result = subscriptionService.toggleSubscription(testUser.getUsername(), hackathon1.getId());

        // Assert
        assertThat(result.status()).isEqualTo(HackathonSubscriptionService.ToggleStatus.UNSUBSCRIBED);

        // Verifica nel DB che l'iscrizione sia stata rimossa
        User updatedUser = userRepository.findById(testUser.getId()).orElseThrow();
        assertThat(updatedUser.getSubscribedHackathon()).isNull();
    }

    @Test
    void shouldReturnConflictIfSubscribedToAnotherHackathon() {
        // Arrange: L'utente è iscritto all'hackathon 1
        subscriptionService.toggleSubscription(testUser.getUsername(), hackathon1.getId());

        // Act: L'utente prova a iscriversi all'hackathon 2
        var result = subscriptionService.toggleSubscription(testUser.getUsername(), hackathon2.getId());

        // Assert
        assertThat(result.status()).isEqualTo(HackathonSubscriptionService.ToggleStatus.CONFLICT_ALREADY_SUBSCRIBED_TO_ANOTHER);

        // Verifica che l'iscrizione sia rimasta all'hackathon 1 e non sia cambiata
        User updatedUser = userRepository.findById(testUser.getId()).orElseThrow();
        assertThat(updatedUser.getSubscribedHackathon()).isNotNull(); // Non deve essere null
        assertThat(updatedUser.getSubscribedHackathon().getId()).isEqualTo(hackathon1.getId());
    }
}