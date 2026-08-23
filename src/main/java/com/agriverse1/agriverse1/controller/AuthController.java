package com.agriverse1.agriverse1.controller;

import com.agriverse1.agriverse1.dto.*;
import com.agriverse1.agriverse1.entity.User;
import com.agriverse1.agriverse1.security.JwtService;
import com.agriverse1.agriverse1.service.UserService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for authentication operations.
 *
 * POST /api/auth/register  — register a new user
 * POST /api/auth/login     — authenticate and receive a JWT
 *
 * CORS: configured globally in SecurityConfig; local dev allows localhost:5173.
 * Repository access is intentionally kept inside UserService only.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthController(
            UserService userService,
            AuthenticationManager authenticationManager,
            JwtService jwtService) {

        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }


    /** Register a new user account. */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        userService.registerUser(request);

        return ResponseEntity.ok(
                new ApiResponse("User Registered Successfully")
        );
    }


    /** Authenticate and return a signed JWT. */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {

        // Throws BadCredentialsException if credentials are wrong (handled by GlobalExceptionHandler)
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // Look up user through the service layer only
        User user = userService.findByEmail(request.getEmail());

        if (user.isSuspended()) {
            return ResponseEntity.status(403).body(new AuthResponse("Account Suspended", "NONE"));
        }

        String token = jwtService.generateToken(user.getEmail());

        return ResponseEntity.ok(new AuthResponse(token, user.getRole()));
    }
}