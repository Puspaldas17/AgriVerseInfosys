package com.agriverse1.agriverse1.controller;

import com.agriverse1.agriverse1.dto.ApiResponse;
import com.agriverse1.agriverse1.dto.UserSyncDto;
import com.agriverse1.agriverse1.entity.User;
import com.agriverse1.agriverse1.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    private User getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return null;
        }
        return userService.findByEmail(auth.getName());
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile() {
        User user = getAuthenticatedUser();
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping("/sync")
    public ResponseEntity<ApiResponse> syncUserData(@RequestBody UserSyncDto syncDto) {
        User user = getAuthenticatedUser();
        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        user.setXp(syncDto.getXp());
        user.setLevel(syncDto.getLevel());
        user.setMissionsState(syncDto.getMissionsState());

        userService.saveUser(user);

        return ResponseEntity.ok(new ApiResponse("Data synced successfully"));
    }
}
