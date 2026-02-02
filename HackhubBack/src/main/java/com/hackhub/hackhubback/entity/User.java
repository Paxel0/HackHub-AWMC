package com.hackhub.hackhubback.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "subscribed_hackathon_id")
    private Hackathon subscribedHackathon;


    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String role = "utente";

    public Hackathon getSubscribedHackathon() { return subscribedHackathon; }
    public void setSubscribedHackathon(Hackathon subscribedHackathon) { this.subscribedHackathon = subscribedHackathon; }


    public Long getId() {

        return id;
    }

    public String getUsername() {

        return username;
    }

    public void setUsername(String username) {

        this.username = username;
    }

    public String getPassword() {

        return password;
    }

    public void setPassword(String password) {

        this.password = password;
    }

    public String getRole() {
        return role;
    }

    // Verifica se l'entity User è incompleta (username o password mancanti o composti solo da spazi)
    // Ritorna un primitivo boolean per evitare null pointer quando usato senza un Optional
    public boolean isEmpty() {
        return this.username == null || this.username.trim().isEmpty()
                || this.password == null || this.password.trim().isEmpty();
    }

    public void setRole(String utente) {
        this.role = utente;
    }
}
