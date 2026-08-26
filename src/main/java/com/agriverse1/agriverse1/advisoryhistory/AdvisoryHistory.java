package com.agriverse1.agriverse1.advisoryhistory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "advisory_history")
public class AdvisoryHistory {

    @Id
    private String id;

    // Logged-in farmer's email from JWT
    private String userEmail;

    // AI_ASSISTANT or PEST_DETECTOR
    private String source;

    // Crop mentioned/detected when available
    private String crop;

    // Farmer's question for AI Assistant
    private String question;

    // Pest/disease title for Pest Detector
    private String diagnosis;

    // Description returned by Pest Detector
    private String description;

    // AI answer or Pest Detector recommendation
    private String recommendation;

    // Confidence returned by Pest Detector
    private String confidence;

    // Image filename for Pest Detector
    private String fileName;

    // Whether pest detector says crop is healthy
    private Boolean healthy;

    // COMPLETED / HEALTHY / ISSUE_DETECTED
    private String status;

    // Date shown in Advisory History
    private LocalDate date;

    // Exact time used for sorting
    private LocalDateTime createdAt;
}