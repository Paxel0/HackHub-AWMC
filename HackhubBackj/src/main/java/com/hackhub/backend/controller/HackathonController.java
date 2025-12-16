package com.hackhub.backend.controller;

import com.hackhub.backend.model.Hackathon;
import com.hackhub.backend.repository.HackathonRepository;

import java.io.IOException;
import java.net.InetSocketAddress;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class HackathonController {
    private final HackathonRepository repository;

    public HackathonController(HackathonRepository repository) {
        this.repository = repository;
    }

    public void startServer() throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        server.createContext("/hackathons", new HttpHandler() {
            @Override
            public void handle(HttpExchange exchange) throws IOException {
                if ("POST".equals(exchange.getRequestMethod())) {
                    handleAddHackathon(exchange);
                } else if ("GET".equals(exchange.getRequestMethod())) {
                    handleGetHackathons(exchange);
                } else {
                    exchange.sendResponseHeaders(405, -1); // Method Not Allowed
                }
            }
        });

        server.setExecutor(null);
        server.start();
    }

    private void handleAddHackathon(HttpExchange exchange) throws IOException {
        byte[] requestBody = exchange.getRequestBody().readAllBytes();
        String body = new String(requestBody);
        String[] parts = body.split(",");

        if (parts.length == 3) {
            Hackathon hackathon = new Hackathon(parts[0], parts[1], parts[2]);
            repository.addHackathon(hackathon);
            exchange.sendResponseHeaders(201, -1); // Created
        } else {
            exchange.sendResponseHeaders(400, -1); // Bad Request
        }
    }

    private void handleGetHackathons(HttpExchange exchange) throws IOException {
        StringBuilder response = new StringBuilder();
        for (Hackathon hackathon : repository.getAllHackathons()) {
            response.append(hackathon.toString()).append("\n");
        }
        byte[] responseBytes = response.toString().getBytes();
        exchange.sendResponseHeaders(200, responseBytes.length);
        exchange.getResponseBody().write(responseBytes);
        exchange.getResponseBody().close();
    }
}
