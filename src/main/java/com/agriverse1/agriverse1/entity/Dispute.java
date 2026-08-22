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
@Document(collection = "disputes")
public class Dispute {
    @Id
    private String id;
    private String listingId;
    private String buyerId;
    private String buyerName;
    private String sellerId;
    private String sellerName;
    private String reason;
    private String status; // OPEN, RESOLVED, DISMISSED
    
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
