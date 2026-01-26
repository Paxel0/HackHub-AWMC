package com.hackhub.hackhubback.controller;

import com.hackhub.hackhubback.entity.Hackathon;
import com.hackhub.hackhubback.service.HackathonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hackathons")
public class HackathonController {

    private final HackathonService hackathonService;

    public HackathonController(HackathonService hackathonService) {
        this.hackathonService = hackathonService;
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
