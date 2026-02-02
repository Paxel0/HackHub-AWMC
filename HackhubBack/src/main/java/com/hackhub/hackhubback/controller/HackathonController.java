package com.hackhub.hackhubback.controller;

import com.hackhub.hackhubback.entity.Hackathon;
import com.hackhub.hackhubback.service.HackathonService;
import com.hackhub.hackhubback.service.HackathonSubscriptionService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/hackathons")
public class HackathonController {

    private final HackathonService hackathonService;
    private final HackathonSubscriptionService subscriptionService;


    public HackathonController(HackathonService hackathonService,
                               HackathonSubscriptionService subscriptionService) {
        this.hackathonService = hackathonService;
        this.subscriptionService = subscriptionService;
    }

    // GET /api/hackathons/me/subscription - Hackathon a cui sono iscritto (se presente)
    @GetMapping("/me/subscription")
    public ResponseEntity<Hackathon> getMySubscription(Principal principal) {
        return subscriptionService.getMySubscribedHackathon(principal.getName())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    // POST /api/hackathons/{id}/subscription - Toggle iscrizione/disiscrizione
    @PostMapping("/{id}/subscription")
    public ResponseEntity<?> toggleSubscription(@PathVariable Long id, Principal principal) {
        HackathonSubscriptionService.ToggleResult result =
                subscriptionService.toggleSubscription(principal.getName(), id);

        return switch (result.status()) {
            case SUBSCRIBED -> ResponseEntity.ok(result.hackathon());
            case UNSUBSCRIBED -> ResponseEntity.noContent().build();
            case CONFLICT_ALREADY_SUBSCRIBED_TO_ANOTHER ->
                    ResponseEntity.status(409).body("Sei già iscritto ad un altro hackathon");
        };
    }

    // GET /hackathons - Lista tutti gli hackathon
    @GetMapping
    public ResponseEntity<List<Hackathon>> getAllHackathons() {
        return ResponseEntity.ok(hackathonService.findAll());
    }

    // GET /hackathons/{id} - Dettaglio hackathon
    @GetMapping("/{id}")
    public ResponseEntity<Hackathon> getHackathonById(@PathVariable Long id) {
        Hackathon hackathon = hackathonService.findById(id);
        if (hackathon != null) {
            return ResponseEntity.ok(hackathon);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST /hackathons - Crea nuovo hackathon
    @PostMapping
    public ResponseEntity<Hackathon> createHackathon(@RequestBody Hackathon hackathon) {
        return ResponseEntity.ok(hackathonService.save(hackathon));
    }

}
