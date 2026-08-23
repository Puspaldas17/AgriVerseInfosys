package com.agriverse1.agriverse1.controller;

import com.agriverse1.agriverse1.entity.User;
import com.agriverse1.agriverse1.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Admin-only REST controller.
 * All endpoints are protected by hasRole("ADMIN") in SecurityConfig.
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /** GET all users (passwords stripped) */
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        users.forEach(user -> user.setPassword(null));
        return ResponseEntity.ok(users);
    }

    /** GET platform stats */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        List<User> users = userRepository.findAll();
        long totalUsers  = users.stream().filter(u -> "USER".equals(u.getRole())).count();
        long totalAdmins = users.stream().filter(u -> "ADMIN".equals(u.getRole())).count();
        long totalAll    = users.size();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers",   totalAll);
        stats.put("farmers",      totalUsers);
        stats.put("admins",       totalAdmins);
        stats.put("activeNow",    (int)(Math.random() * 20) + 5);  // placeholder
        return ResponseEntity.ok(stats);
    }

    /** DELETE a user by ID */
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable String id) {
        Map<String, String> response = new HashMap<>();
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            response.put("message", "User not found");
            return ResponseEntity.status(404).body(response);
        }
        if ("ADMIN".equals(user.get().getRole())) {
            response.put("message", "Cannot delete an admin account");
            return ResponseEntity.status(403).body(response);
        }
        userRepository.deleteById(id);
        response.put("message", "User deleted successfully");
        return ResponseEntity.ok(response);
    }

    /** PATCH — update a user's role */
    @PatchMapping("/users/{id}/role")
    public ResponseEntity<Map<String, String>> updateUserRole(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {

        Map<String, String> response = new HashMap<>();
        Optional<User> optUser = userRepository.findById(id);

        if (optUser.isEmpty()) {
            response.put("message", "User not found");
            return ResponseEntity.status(404).body(response);
        }

        String newRole = body.getOrDefault("role", "USER").toUpperCase();
        if (!List.of("USER", "ADMIN", "VET").contains(newRole)) {
            response.put("message", "Invalid role");
            return ResponseEntity.badRequest().body(response);
        }

        User user = optUser.get();
        user.setRole(newRole);
        userRepository.save(user);

        response.put("message", "Role updated to " + newRole);
        return ResponseEntity.ok(response);
    }

    /** PATCH — toggle user suspension */
    @PatchMapping("/users/{id}/suspend")
    public ResponseEntity<Map<String, String>> toggleUserSuspend(@PathVariable String id) {
        Map<String, String> response = new HashMap<>();
        Optional<User> optUser = userRepository.findById(id);

        if (optUser.isEmpty()) {
            response.put("message", "User not found");
            return ResponseEntity.status(404).body(response);
        }

        User user = optUser.get();
        if ("ADMIN".equals(user.getRole())) {
            response.put("message", "Cannot suspend an admin account");
            return ResponseEntity.status(403).body(response);
        }

        user.setSuspended(!user.isSuspended());
        userRepository.save(user);

        response.put("message", user.isSuspended() ? "User suspended" : "User unsuspended");
        response.put("suspended", String.valueOf(user.isSuspended()));
        return ResponseEntity.ok(response);
    }

    /** POST — reset user password to default */
    @PostMapping("/users/{id}/reset-password")
    public ResponseEntity<Map<String, String>> resetUserPassword(@PathVariable String id) {
        Map<String, String> response = new HashMap<>();
        Optional<User> optUser = userRepository.findById(id);

        if (optUser.isEmpty()) {
            response.put("message", "User not found");
            return ResponseEntity.status(404).body(response);
        }

        User user = optUser.get();
        if ("ADMIN".equals(user.getRole())) {
            response.put("message", "Cannot reset an admin account password here");
            return ResponseEntity.status(403).body(response);
        }

        String tempPassword = "password123";
        user.setPassword(passwordEncoder.encode(tempPassword));
        userRepository.save(user);

        response.put("message", "Password reset successful");
        response.put("tempPassword", tempPassword);
        return ResponseEntity.ok(response);
    }
}
