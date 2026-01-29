package com.hackhub.hackhubback.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String role = "utente";

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
