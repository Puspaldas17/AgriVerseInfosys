package com.agriverse1.agriverse1.repository;

import com.agriverse1.agriverse1.entity.ContactRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactRequestRepository
        extends MongoRepository<ContactRequest, String> {
}