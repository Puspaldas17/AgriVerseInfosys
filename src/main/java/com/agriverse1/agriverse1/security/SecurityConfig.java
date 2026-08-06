package com.agriverse1.agriverse1.security;


import com.agriverse1.agriverse1.service.CustomUserDetailsService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;



@Configuration
public class SecurityConfig {


    private final JwtAuthenticationFilter jwtFilter;

    private final CustomUserDetailsService userDetailsService;

    private final PasswordEncoder passwordEncoder;


    public SecurityConfig(
            JwtAuthenticationFilter jwtFilter,
            CustomUserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder) {

        this.jwtFilter = jwtFilter;
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;

    }



    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {


        http
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth

                    .requestMatchers(
                            "/",
                            "/index.html",
                            "/signup.html",
                            "/login.html",
                            "/style.css",
                            "/script.js",
                            "/css/**",
                            "/js/**",
                            "/images/**",
                            "/api/auth/**"
                    )
                    .permitAll()

                    .anyRequest()
                    .authenticated()
            )
            .sessionManagement(session ->
                    session.sessionCreationPolicy(
                            SessionCreationPolicy.STATELESS
                    )
            )

            .authenticationProvider(authenticationProvider())

            .addFilterBefore(
                    jwtFilter,
                    UsernamePasswordAuthenticationFilter.class
            );


        return http.build();

    }



    @Bean
    public AuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider(
                        userDetailsService
                );

        provider.setPasswordEncoder(
                passwordEncoder
        );

        return provider;
    }

   



    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {


        return configuration.getAuthenticationManager();

    }

}