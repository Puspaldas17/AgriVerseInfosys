package com.agriverse1.agriverse1.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;


@Service
public class JwtService {


    private final String SECRET_KEY =
            "agriverseSecretKeyForJwtAuthentication123456789";


    private Key getKey() {

        return Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes()
        );
    }


    public String generateToken(String email) {


        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(
                        new Date(System.currentTimeMillis() + 1000 * 60 * 60)
                )
                .signWith(getKey())
                .compact();

    }


    public String extractEmail(String token) {


        return Jwts.parser()
                .verifyWith((javax.crypto.SecretKey) getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();

    }

}