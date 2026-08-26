package com.agriverse1.agriverse1.advisoryhistory;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class AdvisoryHistoryService {

    private final AdvisoryHistoryRepository repository;

    public AdvisoryHistoryService(AdvisoryHistoryRepository repository) {
        this.repository = repository;
    }

    /**
     * Save an AI Assistant interaction.
     *
     * History failure must not break the AI Assistant response.
     */
    public void saveAiAssistantHistory(
            String userEmail,
            String question,
            String response) {

        try {
            AdvisoryHistory history = AdvisoryHistory.builder()
                    .userEmail(userEmail)
                    .source("AI_ASSISTANT")
                    .crop(extractCrop(question))
                    .question(question)
                    .recommendation(response)
                    .status("COMPLETED")
                    .date(LocalDate.now())
                    .createdAt(LocalDateTime.now())
                    .build();

            repository.save(history);

        } catch (Exception e) {
            log.error("Could not save AI Assistant advisory history", e);
        }
    }

    /**
     * Save a Pest Detector result.
     *
     * History failure must not break Pest Detector response.
     */
    public void savePestDetectorHistory(
            String userEmail,
            String crop,
            String title,
            String confidence,
            String description,
            String recommendation,
            boolean healthy,
            String fileName) {

        try {
            AdvisoryHistory history = AdvisoryHistory.builder()
                    .userEmail(userEmail)
                    .source("PEST_DETECTOR")
                    .crop(resolvePestCrop(crop, fileName))
                    .diagnosis(title)
                    .confidence(confidence)
                    .description(description)
                    .recommendation(recommendation)
                    .healthy(healthy)
                    .fileName(fileName)
                    .status(healthy ? "HEALTHY" : "ISSUE_DETECTED")
                    .date(LocalDate.now())
                    .createdAt(LocalDateTime.now())
                    .build();

            repository.save(history);

        } catch (Exception e) {
            log.error("Could not save Pest Detector history", e);
        }
    }

    /**
     * Get complete history for the logged-in farmer.
     * Includes previous days as well as today.
     */
    public List<AdvisoryHistoryResponse> getHistory(String userEmail) {

        return repository.findByUserEmailOrderByCreatedAtDesc(userEmail)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private AdvisoryHistoryResponse toResponse(AdvisoryHistory history) {

        return AdvisoryHistoryResponse.builder()
                .id(history.getId())
                .source(history.getSource())
                .crop(history.getCrop())
                .question(history.getQuestion())
                .diagnosis(history.getDiagnosis())
                .description(history.getDescription())
                .recommendation(history.getRecommendation())
                .confidence(history.getConfidence())
                .fileName(history.getFileName())
                .healthy(history.getHealthy())
                .status(history.getStatus())
                .date(history.getDate())
                .createdAt(history.getCreatedAt())
                .build();
    }

    /**
     * Detect a crop from an AI Assistant question.
     * We only use a crop when it is actually mentioned.
     * We never invent a crop.
     */
    private String extractCrop(String question) {

        if (question == null) {
            return "General";
        }

        String message = question.toLowerCase();

        String[] crops = {
                "rice",
                "paddy",
                "wheat",
                "tomato",
                "cotton",
                "chilli",
                "chili",
                "maize",
                "corn",
                "potato",
                "onion",
                "groundnut",
                "soybean",
                "sugarcane"
        };

        for (String crop : crops) {
            if (message.contains(crop)) {
                if (crop.equals("paddy")) {
                    return "Rice";
                }

                if (crop.equals("chili")) {
                    return "Chilli";
                }

                if (crop.equals("corn")) {
                    return "Maize";
                }

                return crop.substring(0, 1).toUpperCase()
                        + crop.substring(1);
            }
        }

        return "General";
    }

    /**
     * Current Pest Detector endpoint only receives an image.
     * If a crop is supplied in the future, it is used.
     * Otherwise we check the filename only when it explicitly contains
     * a known crop name. We never invent a crop.
     */
    private String resolvePestCrop(String crop, String fileName) {

        if (crop != null && !crop.isBlank()) {
            return crop;
        }

        if (fileName != null) {
            String name = fileName.toLowerCase();

            String[] crops = {
                    "rice",
                    "paddy",
                    "wheat",
                    "tomato",
                    "cotton",
                    "chilli",
                    "chili",
                    "maize",
                    "corn",
                    "potato",
                    "onion",
                    "groundnut",
                    "soybean",
                    "sugarcane"
            };

            for (String knownCrop : crops) {
                if (name.contains(knownCrop)) {
                    if (knownCrop.equals("paddy")) {
                        return "Rice";
                    }

                    if (knownCrop.equals("chili")) {
                        return "Chilli";
                    }

                    if (knownCrop.equals("corn")) {
                        return "Maize";
                    }

                    return knownCrop.substring(0, 1).toUpperCase()
                            + knownCrop.substring(1);
                }
            }
        }

        return "Unknown";
    }
}