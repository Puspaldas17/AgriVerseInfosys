package com.agriverse1.agriverse1.repository;

import com.agriverse1.agriverse1.entity.Dispute;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DisputeRepository extends MongoRepository<Dispute, String> {
    List<Dispute> findByStatus(String status);
}
