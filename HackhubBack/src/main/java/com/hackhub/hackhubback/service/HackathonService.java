package com.hackhub.hackhubback.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hackhub.hackhubback.entity.Hackathon;
import com.hackhub.hackhubback.repository.HackathonRepository;

@Service
@Transactional
public class HackathonService {

    private final HackathonRepository repository;

    public HackathonService(HackathonRepository repository) {
        this.repository = repository;
    }

    public List<Hackathon> findAll() {
        return repository.findAll();
    }

    public Hackathon findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Hackathon save(Hackathon hackathon) {
        return repository.save(hackathon);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
