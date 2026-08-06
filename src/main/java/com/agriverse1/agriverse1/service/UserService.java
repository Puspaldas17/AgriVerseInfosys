package com.agriverse1.agriverse1.service;

import com.agriverse1.agriverse1.entity.User;
import com.agriverse1.agriverse1.repository.UserRepository;
import com.agriverse1.agriverse1.dto.RegisterRequest;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


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


    public User registerUser(RegisterRequest request) {


        User user = new User();

        user.setName(request.getName());

        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole("USER");


        return userRepository.save(user);
    }
}