package com.hackhub.hackhubback.service;

import com.hackhub.hackhubback.entity.Hackathon;
import com.hackhub.hackhubback.entity.User;
import com.hackhub.hackhubback.repository.HackathonRepository;
import com.hackhub.hackhubback.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class HackathonSubscriptionService {

    public enum ToggleStatus {
        SUBSCRIBED,
        UNSUBSCRIBED,
        CONFLICT_ALREADY_SUBSCRIBED_TO_ANOTHER
    }

    public record ToggleResult(ToggleStatus status, Hackathon hackathon) {}

    private final UserRepository userRepository;
    private final HackathonRepository hackathonRepository;

    public HackathonSubscriptionService(UserRepository userRepository,
                                       HackathonRepository hackathonRepository) {
        this.userRepository = userRepository;
        this.hackathonRepository = hackathonRepository;
    }

    @Transactional(readOnly = true)
    public Optional<Hackathon> getMySubscribedHackathon(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User non trovato: " + username));

        return Optional.ofNullable(user.getSubscribedHackathon());
    }

    @Transactional
    public ToggleResult toggleSubscription(String username, Long hackathonId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User non trovato: " + username));

        Hackathon target = hackathonRepository.findById(hackathonId)
                .orElseThrow(() -> new IllegalArgumentException("Hackathon non trovato: " + hackathonId));

        Hackathon current = user.getSubscribedHackathon();

        if (current == null) {
            user.setSubscribedHackathon(target);
            userRepository.save(user);
            return new ToggleResult(ToggleStatus.SUBSCRIBED, target);
        }

        if (current.getId().equals(target.getId())) {
            user.setSubscribedHackathon(null);
            userRepository.save(user);
            return new ToggleResult(ToggleStatus.UNSUBSCRIBED, target);
        }

        return new ToggleResult(ToggleStatus.CONFLICT_ALREADY_SUBSCRIBED_TO_ANOTHER, current);
    }
}