package com.agriverse1.agriverse1.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/pest")
public class PestController {

    @PostMapping("/detect")
    public ResponseEntity<Map<String, Object>> detectPest(@RequestParam("image") MultipartFile file) {
        // In a real application, this image would be sent to a ML model or external AI API.
        // For this backend implementation, we simulate an analysis based on random mock data.
        
        Map<String, Object> response = new HashMap<>();
        
        if (file.isEmpty()) {
            response.put("error", "No file uploaded");
            return ResponseEntity.badRequest().body(response);
        }

        Random rand = new Random();
        int outcome = rand.nextInt(3);

        String title;
        String confidence;
        String description;
        String recommendation;
        boolean isHealthy = false;

        switch (outcome) {
            case 0:
                title = "Early Blight (Alternaria solani) Detected";
                confidence = "94.2%";
                description = "Concentric dark rings identified on lower leaf margins. Fungal spore germination accelerated by recent humidity.";
                recommendation = "Apply Mancozeb 75% WP @ 2g/litre or Azoxystrobin 23% SC @ 1ml/litre. Ensure uniform leaf spray coverage.";
                break;
            case 1:
                title = "Fall Armyworm (Spodoptera frugiperda) Detected";
                confidence = "88.7%";
                description = "Significant leaf damage and ragged holes observed. Larvae presence detected in the whorl.";
                recommendation = "Apply Spinetoram 11.7% SC @ 0.5ml/litre or Chlorantraniliprole 18.5% SC @ 0.4ml/litre.";
                break;
            default:
                title = "Healthy Crop";
                confidence = "99.1%";
                description = "No significant signs of disease, nutrient deficiency, or pest infestation detected in the provided image.";
                recommendation = "Maintain current irrigation and fertilizer schedule. Continue regular monitoring.";
                isHealthy = true;
                break;
        }

        response.put("title", title);
        response.put("confidence", confidence);
        response.put("description", description);
        response.put("recommendation", recommendation);
        response.put("isHealthy", isHealthy);
        response.put("fileName", file.getOriginalFilename());

        return ResponseEntity.ok(response);
    }
}
