package com.agriverse1.agriverse1.controller;

import com.agriverse1.agriverse1.advisoryhistory.AdvisoryHistoryService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * Pest detection endpoint — accepts an image upload and returns diagnostic results.
 *
 * POST /api/pest/detect
 * Upload a crop image to get a pest/disease diagnosis.
 */
@RestController
@RequestMapping("/api/pest")
public class PestController {

    private final AdvisoryHistoryService advisoryHistoryService;

    public PestController(AdvisoryHistoryService advisoryHistoryService) {
        this.advisoryHistoryService = advisoryHistoryService;
    }

    /*
     * Existing pest diagnosis data.
     * DO NOT change the existing diagnosis logic.
     */
    private static final String[][] DIAGNOSES = {

        {
            "Early Blight (Alternaria solani) Detected",
            "91.5%",
            "Concentric dark rings identified on lower leaf margins. "
                    + "Fungal spore germination accelerated by high humidity conditions.",
            "Apply Mancozeb 75% WP @ 2g/litre or Azoxystrobin 23% SC @ 1ml/litre. "
                    + "Ensure uniform leaf spray coverage.",
            "false"
        },

        {
            "Fall Armyworm (Spodoptera frugiperda) Detected",
            "86.3%",
            "Significant leaf damage and ragged holes observed. "
                    + "Larvae presence likely in the whorl.",
            "Apply Spinetoram 11.7% SC @ 0.5ml/litre or "
                    + "Chlorantraniliprole 18.5% SC @ 0.4ml/litre during cool hours.",
            "false"
        },

        {
            "Powdery Mildew (Erysiphe sp.) Detected",
            "89.7%",
            "White powdery coating observed on upper leaf surfaces. "
                    + "Condition worsens in warm, dry weather followed by humid nights.",
            "Apply Hexaconazole 5% EC @ 1ml/litre or Wettable Sulphur 80% WP @ 2g/litre. "
                    + "Improve air circulation around plants.",
            "false"
        },

        {
            "Healthy Crop — No Issues Found",
            "98.8%",
            "No significant signs of disease, nutrient deficiency, "
                    + "or pest infestation detected in the provided image.",
            "Maintain your current irrigation and fertilizer schedule. "
                    + "Continue regular field monitoring every 3 days.",
            "true"
        }
    };

    /**
     * Pest Detector endpoint.
     *
     * The existing response is returned to the frontend.
     * Additionally, the result is saved to Advisory History.
     */
    @PostMapping("/detect")
    public ResponseEntity<Map<String, Object>> detect(
            @RequestParam("image") MultipartFile file,
            Authentication authentication) {

        Map<String, Object> response = new HashMap<>();

        /*
         * Validate image.
         */
        if (file == null || file.isEmpty()) {
            response.put("error", "No image file was provided.");
            return ResponseEntity.badRequest().body(response);
        }

        /*
         * Existing diagnosis selection.
         */
        String[] result =
                DIAGNOSES[new Random().nextInt(DIAGNOSES.length)];

        String title = result[0];
        String confidence = result[1];
        String description = result[2];
        String recommendation = result[3];
        boolean healthy = Boolean.parseBoolean(result[4]);

        String fileName = file.getOriginalFilename();

        /*
         * Existing Pest Detector response.
         */
        response.put("title", title);
        response.put("confidence", confidence);
        response.put("description", description);
        response.put("recommendation", recommendation);
        response.put("isHealthy", healthy);
        response.put("fileName", fileName);

        /*
         * ==========================================================
         * ADVISORY HISTORY INTEGRATION
         * ==========================================================
         *
         * Save every Pest Detector activity in MongoDB.
         *
         * authentication.getName()
         *     -> identifies the logged-in farmer.
         *
         * null
         *     -> crop is not available from the current Pest Detector
         *        request, so we do not invent a crop name.
         *
         * title
         * confidence
         * description
         * recommendation
         * healthy
         * fileName
         *     -> complete Pest Detector result.
         */
        advisoryHistoryService.savePestDetectorHistory(
                authentication.getName(),
                null,
                title,
                confidence,
                description,
                recommendation,
                healthy,
                fileName
        );

        /*
         * Return the original Pest Detector response.
         *
         * This means the existing Pest Detector frontend
         * should continue working as before.
         */
        return ResponseEntity.ok(response);
    }
}