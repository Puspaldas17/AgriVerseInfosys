package com.agriverse1.agriverse1.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "marketplace_listings")
public class MarketplaceListing {
    @Id
    private String id;
    private String farmerId;
    private String farmerName;
    private String title;
    private String description;
    private Double price;
    private Double quantity;
    private String unit;
    private String category;
    private String status; // PENDING, APPROVED, REJECTED, SOLD
    
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
