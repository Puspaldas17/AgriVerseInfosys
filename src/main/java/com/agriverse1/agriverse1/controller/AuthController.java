package com.agriverse1.agriverse1.controller;


import com.agriverse1.agriverse1.dto.*;
import com.agriverse1.agriverse1.entity.User;
import com.agriverse1.agriverse1.repository.UserRepository;
import com.agriverse1.agriverse1.security.JwtService;
import com.agriverse1.agriverse1.service.UserService;


import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {


    private final UserService userService;

    private final UserRepository userRepository;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;



    public AuthController(
            UserService userService,
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            JwtService jwtService) {

        this.userService = userService;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;

    }



    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(
            @RequestBody RegisterRequest request) {


        userService.registerUser(request);


        return ResponseEntity.ok(
                new ApiResponse("User Registered Successfully")
        );

    }



    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody LoginRequest request) {


        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );


        User user =
                userRepository.findByEmail(
                        request.getEmail()
                ).orElseThrow();



        String token =
                jwtService.generateToken(
                        user.getEmail()
                );


        return ResponseEntity.ok(
                new AuthResponse(token)
        );

    }

}