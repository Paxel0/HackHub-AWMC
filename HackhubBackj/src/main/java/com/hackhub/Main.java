package com.hackhub;

import com.hackhub.backend.controller.HackathonController;
import com.hackhub.backend.repository.HackathonRepository;

import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        System.out.println("Benvenuto su Hackhub!");

        HackathonRepository repository = new HackathonRepository();
        HackathonController controller = new HackathonController(repository);

        try {
            controller.startServer();
            System.out.println("Server avviato su http://localhost:8080");
        } catch (IOException e) {
            System.err.println("Errore durante l'avvio del server: " + e.getMessage());
        }
    }
}
