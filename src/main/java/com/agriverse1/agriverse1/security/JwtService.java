package com.agriverse1.agriverse1.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

/**
 * Utility service for generating and validating JWT tokens.
 * The secret key and expiration are loaded from application.properties
 * (or overridden via environment variables JWT_SECRET / JWT_EXPIRATION).
 */
@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expirationMs;


    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }


    /** Generate a signed JWT for the given email (subject). */
    public String generateToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(getKey())
                .compact();
    }


    /** Extract the email (subject) from a valid JWT. */
    public String extractEmail(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}