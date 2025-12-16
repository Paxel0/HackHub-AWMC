package com.hackhub.backend.repository;

import com.hackhub.backend.model.Hackathon;

import java.util.ArrayList;
import java.util.List;

public class HackathonRepository {
    private final List<Hackathon> hackathons = new ArrayList<>();

    public void addHackathon(Hackathon hackathon) {
        hackathons.add(hackathon);
    }

    public List<Hackathon> getAllHackathons() {
        return new ArrayList<>(hackathons);
    }
}
