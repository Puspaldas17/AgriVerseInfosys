package com.agriverse1.agriverse1.controller;

import com.agriverse1.agriverse1.dto.ApiResponse;
import com.agriverse1.agriverse1.dto.ProfileUpdateDto;
import com.agriverse1.agriverse1.dto.UserSyncDto;
import com.agriverse1.agriverse1.entity.User;
import com.agriverse1.agriverse1.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for user profile and gamification data sync.
 * GET  /api/user/profile  — Fetch current user's full profile from MongoDB
 * POST /api/user/profile  — Save farmer profile details (phone, soilType, landSize, language)
 * POST /api/user/sync     — Save user's XP, level, and mission state to MongoDB
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    private User getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getName().equals("anonymousUser")) {
            return null;
        }
        return userService.findByEmail(auth.getName());
    }

    /** GET /api/user/profile — returns full user profile (password omitted) */
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        User user = getAuthenticatedUser();
        if (user == null) {
            return ResponseEntity.status(401).body(new ApiResponse("Unauthorized"));
        }
        // Never expose the password hash to the frontend
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }

    /** POST /api/user/profile — update farmer profile fields (name, phone, soil, land, language) */
    @PostMapping("/profile")
    public ResponseEntity<ApiResponse> updateProfile(@RequestBody ProfileUpdateDto dto) {
        User user = getAuthenticatedUser();
        if (user == null) {
            return ResponseEntity.status(401).body(new ApiResponse("Unauthorized"));
        }

        if (dto.getName()     != null) user.setName(dto.getName());
        if (dto.getPhone()    != null) user.setPhone(dto.getPhone());
        if (dto.getSoilType() != null) user.setSoilType(dto.getSoilType());
        if (dto.getLandSize() != null) user.setLandSize(dto.getLandSize());
        if (dto.getLanguage() != null) user.setLanguage(dto.getLanguage());

        userService.saveUser(user);
        return ResponseEntity.ok(new ApiResponse("Profile updated successfully"));
    }

    /** POST /api/user/sync — save XP, level, and mission checkbox state */
    @PostMapping("/sync")
    public ResponseEntity<ApiResponse> syncUserData(@RequestBody UserSyncDto syncDto) {
        User user = getAuthenticatedUser();
        if (user == null) {
            return ResponseEntity.status(401).body(new ApiResponse("Unauthorized"));
        }

        user.setXp(syncDto.getXp());
        user.setLevel(syncDto.getLevel());
        user.setMissionsState(syncDto.getMissionsState());
        userService.saveUser(user);

        return ResponseEntity.ok(new ApiResponse("Data synced successfully"));
    }
}
