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
@Document(collection = "contact_requests")
public class ContactRequest {

    @Id
    private String id;

    private String listingId;

    private String farmerId;

    private String farmerName;

    private String buyerName;

    private String buyerPhone;

    private String buyerMessage;

    private LocalDateTime contactedAt;
}