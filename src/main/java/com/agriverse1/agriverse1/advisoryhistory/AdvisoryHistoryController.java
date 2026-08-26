package com.agriverse1.agriverse1.advisoryhistory;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/advisory-history")
public class AdvisoryHistoryController {

    private final AdvisoryHistoryService advisoryHistoryService;

    public AdvisoryHistoryController(
            AdvisoryHistoryService advisoryHistoryService) {

        this.advisoryHistoryService = advisoryHistoryService;
    }

    /**
     * Returns the complete advisory history of the logged-in farmer.
     *
     * Includes previous days and today's records.
     */
    @GetMapping
    public ResponseEntity<List<AdvisoryHistoryResponse>> getHistory(
            Authentication authentication) {

        String userEmail = authentication.getName();

        return ResponseEntity.ok(
                advisoryHistoryService.getHistory(userEmail)
        );
    }
}