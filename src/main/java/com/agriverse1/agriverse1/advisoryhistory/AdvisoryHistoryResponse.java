package com.agriverse1.agriverse1.advisoryhistory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdvisoryHistoryResponse {

    private String id;

    private String source;

    private String crop;

    private String question;

    private String diagnosis;

    private String description;

    private String recommendation;

    private String confidence;

    private String fileName;

    private Boolean healthy;

    private String status;

    private LocalDate date;

    private LocalDateTime createdAt;
}