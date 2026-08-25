package com.agriverse1.agriverse1.controller;

import com.agriverse1.agriverse1.entity.ContactRequest;
import com.agriverse1.agriverse1.repository.ContactRequestRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin
public class ContactRequestController {

    private final ContactRequestRepository repository;

    public ContactRequestController(ContactRequestRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<ContactRequest> contactSeller(
            @RequestBody ContactRequest request) {

        request.setContactedAt(LocalDateTime.now());

        ContactRequest savedRequest = repository.save(request);

        return ResponseEntity.ok(savedRequest);
    }
}