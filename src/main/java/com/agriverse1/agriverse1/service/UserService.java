package com.agriverse1.agriverse1.service;

import com.agriverse1.agriverse1.entity.User;
import com.agriverse1.agriverse1.repository.UserRepository;
import com.agriverse1.agriverse1.dto.RegisterRequest;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Business logic for user management.
 * This is the ONLY place that interacts with UserRepository.
 */
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    /**
     * Register a new user.
     * @throws DataIntegrityViolationException if email already exists
     */
    public User registerUser(RegisterRequest request) {

        // Explicit duplicate-email check with a clear error message
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new DataIntegrityViolationException(
                    "An account with email '" + request.getEmail() + "' already exists."
            );
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER")
                .build();

        return userRepository.save(user);
    }


    /**
     * Look up a user by email for the auth controller.
     * @throws UsernameNotFoundException if no user with that email exists
     */
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email: " + email)
                );
    }
}