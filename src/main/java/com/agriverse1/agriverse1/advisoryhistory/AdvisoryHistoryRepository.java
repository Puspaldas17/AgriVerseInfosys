package com.agriverse1.agriverse1.advisoryhistory;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AdvisoryHistoryRepository
        extends MongoRepository<AdvisoryHistory, String> {

    List<AdvisoryHistory> findByUserEmailOrderByCreatedAtDesc(String userEmail);
}