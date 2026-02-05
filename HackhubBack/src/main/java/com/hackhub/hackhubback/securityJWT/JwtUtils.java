package com.hackhub.hackhubback.securityJWT;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.io.Decoders;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    // Preferiamo leggere una chiave base64 dall'ambiente per sicurezza
    @Value("${hackhub.app.jwtSecretBase64:}")
    private String jwtSecretBase64;

    // Vecchio fallback (deprecated) — ancora supportato per sviluppo ma non consigliato
    @Value("${hackhub.app.jwtSecret:}")
    private String jwtSecret;

    // Issuer del token (opzionale ma consigliato)
    @Value("${hackhub.app.jwtIssuer:HackHub}")
    private String jwtIssuer;

    @Value("${hackhub.app.jwtExpirationMs:3600000}")
    private int jwtExpirationMs;

    // Metodo helper per ottenere la chiave in modo sicuro
    private SecretKey getSigningKey() {
        // 1) check explicit env vars
        String envBase64 = System.getenv("JWT_SECRET_BASE64");
        if (envBase64 == null || envBase64.isBlank()) {
            envBase64 = System.getenv("HACKHUB_APP_JWTSECRETBASE64");
        }
        if (envBase64 != null && !envBase64.isBlank()) {
            try {
                byte[] keyBytes = Decoders.BASE64.decode(envBase64);
                if (keyBytes.length < 32) throw new IllegalStateException("JWT secret (decoded) is too short: must be at least 32 bytes for HS256");
                return Keys.hmacShaKeyFor(keyBytes);
            } catch (IllegalArgumentException e) {
                throw new IllegalStateException("Invalid base64 JWT secret in environment variable JWT_SECRET_BASE64");
            }
        }

        // 2) check application property jwtSecretBase64
        if (jwtSecretBase64 != null && !jwtSecretBase64.isBlank()) {
            try {
                byte[] keyBytes = Decoders.BASE64.decode(jwtSecretBase64);
                if (keyBytes.length < 32) throw new IllegalStateException("JWT secret (decoded) is too short: must be at least 32 bytes for HS256");
                return Keys.hmacShaKeyFor(keyBytes);
            } catch (IllegalArgumentException e) {
                throw new IllegalStateException("Invalid base64 JWT secret in configuration property hackhub.app.jwtSecretBase64");
            }
        }

        // 3) check docker secret files (common paths)
        String[] secretPaths = new String[]{"/run/secrets/hackhub_jwt_secret", "/run/secrets/jwt_secret", "/run/secrets/HACKHUB_APP_JWTSECRETBASE64"};
        for (String p : secretPaths) {
            Path path = Paths.get(p);
            if (Files.exists(path)) {
                try {
                    String content = new String(Files.readAllBytes(path), StandardCharsets.UTF_8).trim();
                    // try base64 decode first
                    try {
                        byte[] keyBytes = Decoders.BASE64.decode(content);
                        if (keyBytes.length < 32) throw new IllegalStateException("JWT secret (decoded from secret file) is too short");
                        return Keys.hmacShaKeyFor(keyBytes);
                    } catch (IllegalArgumentException ex) {
                        // not base64? use raw bytes
                        byte[] keyBytes = content.getBytes(StandardCharsets.UTF_8);
                        if (keyBytes.length < 32) throw new IllegalStateException("JWT secret (from secret file) is too short: must be at least 32 bytes");
                        return Keys.hmacShaKeyFor(keyBytes);
                    }
                } catch (IOException ioe) {
                    logger.warn("Failed to read JWT secret file {}: {}", p, ioe.getMessage());
                }
            }
        }

        // 4) fallback per sviluppo: secret in chiaro (non consigliato in produzione)
        if (jwtSecret != null && !jwtSecret.isBlank()) {
            byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
            if (keyBytes.length < 32) {
                throw new IllegalStateException("JWT secret in application.properties is too short: must be at least 32 bytes (use a longer secret or base64-encoded one)");
            }
            logger.warn("Using non-base64 JWT secret from configuration — consider switching to a base64 env var (JWT_SECRET_BASE64) and avoid committing secrets to VCS.");
            return Keys.hmacShaKeyFor(keyBytes);
        }

        // 5) FALLBACK CRITICO PER SVILUPPO LOCALE
        logger.warn("!!! NESSUNA CHIAVE JWT CONFIGURATA !!! Generazione chiave temporanea in memoria.");
        logger.warn("Ogni riavvio invaliderà i token esistenti. Configura JWT_SECRET_BASE64 per la persistenza.");
        if (tempKey == null) {
             tempKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        }
        return tempKey;
    }
    
    // Chiave temporanea statica per l'istanza corrente
    private static SecretKey tempKey = null;

    public String generateToken(String username) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .setId(UUID.randomUUID().toString())
                .setSubject(username)
                .setIssuer(jwtIssuer)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String getUsernameFromJwtToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateJwtToken(String token) {
        try {
            var claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            // optional: verify issuer
            if (jwtIssuer != null && !jwtIssuer.isBlank()) {
                String tokenIssuer = claims.getIssuer();
                if (tokenIssuer == null || !tokenIssuer.equals(jwtIssuer)) {
                    logger.debug("JWT issuer mismatch: expected {} but was {}", jwtIssuer, tokenIssuer);
                    return false;
                }
            }

            return true;
        } catch (JwtException | IllegalArgumentException e) {
            logger.debug("JWT validation failed: {}", e.getMessage());
            return false;
        }
    }
}
