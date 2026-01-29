package com.hackhub.hackhubback.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "hackathons")
public class Hackathon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String name;

    private String creator;

    private String description;

    private LocalDate start_date;

    private LocalDate end_date;

    private String location;

    private int max_teams;

    private int reward;

    private boolean is_online;

    protected Hackathon() {
    }

    public Hackathon(String name, String description, LocalDate startDate, LocalDate endDate, String location) {
        this.name = name;
        this.description = description;
        this.start_date = startDate;
        this.end_date = endDate;
        this.location = location;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String nome) {
        this.name = nome;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String descrizione) {
        this.description = descrizione;
    }

    public LocalDate getStartDate() {
        return start_date;
    }

    public void setStartDate(LocalDate dataInizio) {
        this.start_date = dataInizio;
    }

    public LocalDate getEndDate() {
        return end_date;
    }

    public void setEndDate(LocalDate dataFine) {
        this.end_date = dataFine;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
