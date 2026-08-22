package com.agriverse1.agriverse1.controller;

import com.agriverse1.agriverse1.entity.Dispute;
import com.agriverse1.agriverse1.entity.MarketplaceListing;
import com.agriverse1.agriverse1.repository.DisputeRepository;
import com.agriverse1.agriverse1.repository.MarketplaceListingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Admin REST controller for managing the Marketplace and Disputes.
 * Protected by hasRole("ADMIN") in SecurityConfig (under /api/admin/**).
 */
@RestController
@RequestMapping("/api/admin/marketplace")
public class AdminMarketplaceController {

    private final MarketplaceListingRepository listingRepository;
    private final DisputeRepository disputeRepository;

    public AdminMarketplaceController(
            MarketplaceListingRepository listingRepository,
            DisputeRepository disputeRepository) {
        this.listingRepository = listingRepository;
        this.disputeRepository = disputeRepository;
    }

    // --- LISTINGS ---

    @GetMapping("/listings")
    public ResponseEntity<List<MarketplaceListing>> getAllListings(
            @RequestParam(required = false) String status) {
        
        List<MarketplaceListing> listings;
        if (status != null && !status.isEmpty()) {
            listings = listingRepository.findByStatus(status.toUpperCase());
        } else {
            listings = listingRepository.findAll();
        }
        return ResponseEntity.ok(listings);
    }

    @PatchMapping("/listings/{id}/status")
    public ResponseEntity<Map<String, String>> updateListingStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        
        Map<String, String> response = new HashMap<>();
        Optional<MarketplaceListing> optListing = listingRepository.findById(id);
        
        if (optListing.isEmpty()) {
            response.put("message", "Listing not found");
            return ResponseEntity.status(404).body(response);
        }
        
        String newStatus = body.getOrDefault("status", "PENDING").toUpperCase();
        if (!List.of("PENDING", "APPROVED", "REJECTED", "SOLD").contains(newStatus)) {
            response.put("message", "Invalid status");
            return ResponseEntity.badRequest().body(response);
        }
        
        MarketplaceListing listing = optListing.get();
        listing.setStatus(newStatus);
        listingRepository.save(listing);
        
        response.put("message", "Listing status updated to " + newStatus);
        return ResponseEntity.ok(response);
    }

    // --- DISPUTES ---

    @GetMapping("/disputes")
    public ResponseEntity<List<Dispute>> getAllDisputes(
            @RequestParam(required = false) String status) {
        
        List<Dispute> disputes;
        if (status != null && !status.isEmpty()) {
            disputes = disputeRepository.findByStatus(status.toUpperCase());
        } else {
            disputes = disputeRepository.findAll();
        }
        return ResponseEntity.ok(disputes);
    }

    @PatchMapping("/disputes/{id}/status")
    public ResponseEntity<Map<String, String>> updateDisputeStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        
        Map<String, String> response = new HashMap<>();
        Optional<Dispute> optDispute = disputeRepository.findById(id);
        
        if (optDispute.isEmpty()) {
            response.put("message", "Dispute not found");
            return ResponseEntity.status(404).body(response);
        }
        
        String newStatus = body.getOrDefault("status", "OPEN").toUpperCase();
        if (!List.of("OPEN", "RESOLVED", "DISMISSED").contains(newStatus)) {
            response.put("message", "Invalid status");
            return ResponseEntity.badRequest().body(response);
        }
        
        Dispute dispute = optDispute.get();
        dispute.setStatus(newStatus);
        disputeRepository.save(dispute);
        
        response.put("message", "Dispute status updated to " + newStatus);
        return ResponseEntity.ok(response);
    }
}
