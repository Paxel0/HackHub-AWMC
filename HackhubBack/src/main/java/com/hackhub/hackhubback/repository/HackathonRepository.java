package com.hackhub.hackhubback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackhub.hackhubback.entity.Hackathon;

public interface HackathonRepository extends JpaRepository<Hackathon, Long> {
    // Metodi base ereditati: findAll, findById, save, deleteById, ecc.
}
