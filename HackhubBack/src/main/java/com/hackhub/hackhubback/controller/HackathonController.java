package com.hackhub.hackhubback.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackhub.hackhubback.entity.Hackathon;
import com.hackhub.hackhubback.service.HackathonService;

@RestController
@RequestMapping("/api/hackathons")
public class HackathonController {

    private final HackathonService service;

    public HackathonController(HackathonService service) {
        this.service = service;
    }

    @GetMapping
    public List<Hackathon> listAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hackathon> getOne(@PathVariable Long id) {
        Hackathon h = service.findById(id);
        if (h == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(h);
    }

    @PostMapping
    public Hackathon create(@RequestBody Hackathon hackathon) {
        return service.save(hackathon);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
