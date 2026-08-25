package com.agriverse1.agriverse1.controller;

import com.agriverse1.agriverse1.entity.MarketplaceListing;
import com.agriverse1.agriverse1.repository.MarketplaceListingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Public REST controller for the Farmer Marketplace.
 * - GET /api/marketplace/listings      → returns all APPROVED listings
 * - POST /api/marketplace/listings     → submits a new listing (PENDING for admin approval)
 *
 * Permitted without auth (see SecurityConfig).
 */
@RestController
@RequestMapping("/api/marketplace")
@CrossOrigin
public class MarketplaceController {

    private final MarketplaceListingRepository listingRepository;

    public MarketplaceController(MarketplaceListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    /** Returns all approved listings visible to the public. */
    @GetMapping("/listings")
    public ResponseEntity<List<MarketplaceListing>> getApprovedListings() {
        List<MarketplaceListing> listings = listingRepository.findByStatus("APPROVED");
        return ResponseEntity.ok(listings);
    }

    /** Farmer submits a new listing — saved as PENDING until Admin approves. */
    @PostMapping("/listings")
    public ResponseEntity<MarketplaceListing> createListing(
            @RequestBody MarketplaceListing listing) {

        listing.setId(null);                          // ensure Mongo generates the ID
        listing.setStatus("PENDING");                 // always starts as PENDING
        listing.setCreatedAt(LocalDateTime.now());

        if (listing.getFarmerName() == null || listing.getFarmerName().isBlank()) {
            listing.setFarmerName("Anonymous Farmer");
        }

        MarketplaceListing saved = listingRepository.save(listing);
        return ResponseEntity.status(201).body(saved);
    }
}
