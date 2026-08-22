package com.agriverse1.agriverse1.repository;

import com.agriverse1.agriverse1.entity.MarketplaceListing;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarketplaceListingRepository extends MongoRepository<MarketplaceListing, String> {
    List<MarketplaceListing> findByStatus(String status);
}
