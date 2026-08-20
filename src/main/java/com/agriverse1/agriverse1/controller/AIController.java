package com.agriverse1.agriverse1.controller;

import com.agriverse1.agriverse1.dto.ChatRequestDto;
import com.agriverse1.agriverse1.dto.ChatResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * AI Chat endpoint — keyword-based smart engine for farming advice.
 * POST /api/ai/chat  — Send a message, receive contextual farming advice.
 */
@RestController
@RequestMapping("/api/ai")
public class AIController {

    @PostMapping("/chat")
    public ResponseEntity<ChatResponseDto> processChat(@RequestBody ChatRequestDto request) {
        String response = generateResponse(request.getMessage().toLowerCase());
        return ResponseEntity.ok(new ChatResponseDto(response));
    }

    private String generateResponse(String msg) {
        if (msg.contains("hello") || msg.contains("hi") || msg.contains("help")) {
            return "Hello, Farmer! 👋 I'm your AgriVerse AI Assistant. Ask me about weather, crop diseases, fertilizers, pests, or yield optimization!";
        }
        if (msg.contains("weather") || msg.contains("rain") || msg.contains("forecast")) {
            return "Based on current patterns, expect moderate rainfall in the next 48 hours. Delay pesticide application until skies clear to prevent chemical run-off and reduced efficacy.";
        }
        if (msg.contains("tomato") || msg.contains("blight")) {
            return "For tomatoes, Early Blight (Alternaria solani) is common in high humidity. Ensure proper plant spacing for airflow and apply a preventative copper-based fungicide spray weekly.";
        }
        if (msg.contains("rice") || msg.contains("paddy")) {
            return "For rice crops, maintain water level at 5cm during tillering. Watch for Blast disease — apply Tricyclazole 75% WP @ 0.6g/litre at the first sign of lesions.";
        }
        if (msg.contains("wheat")) {
            return "Wheat requires balanced NPK. Apply nitrogen in split doses — 50% at sowing, 25% at crown root initiation, and 25% at jointing stage for optimal grain filling.";
        }
        if (msg.contains("fertilizer") || msg.contains("npk") || msg.contains("urea") || msg.contains("nutrient")) {
            return "For nitrogen-based fertilizers like Urea, apply in split doses to minimize volatilization loss. Try 50% at sowing and remainder at the flowering stage for optimal yield.";
        }
        if (msg.contains("water") || msg.contains("irrigation") || msg.contains("drip")) {
            return "Based on standard soil moisture recommendations, schedule 45 minutes of drip irrigation in the early morning (before 7 AM) to minimize evaporation losses.";
        }
        if (msg.contains("pest") || msg.contains("insect") || msg.contains("bug") || msg.contains("aphid")) {
            return "For aphid or soft-bodied pest infestations, a neem oil solution (5ml per litre of water) is highly effective and organic. Spray during cool morning hours for best results.";
        }
        if (msg.contains("fungus") || msg.contains("fungal") || msg.contains("mold") || msg.contains("mould")) {
            return "For fungal diseases, ensure your crops have good air circulation and avoid waterlogging. Apply Mancozeb 75% WP @ 2g/litre as a broad-spectrum preventive treatment.";
        }
        if (msg.contains("yield") || msg.contains("harvest") || msg.contains("production")) {
            return "To maximize harvest yield, track your crop growth in the Analytics tab daily and maintain consistent soil moisture. A balanced NPK ratio can increase yield by 15-20%.";
        }
        if (msg.contains("soil") || msg.contains("ph")) {
            return "Ideal soil pH is 6.0–7.0 for most crops. If too acidic, apply agricultural lime. If too alkaline, use gypsum or elemental sulfur. Conduct a soil test every season!";
        }
        if (msg.contains("organic") || msg.contains("compost")) {
            return "Adding compost at 5 tonnes/acre before sowing significantly improves water retention and microbial activity in the soil, reducing your need for chemical fertilizers.";
        }
        return "That's a great farming question! While my current Smart Engine covers common topics, I'm always improving. In the meantime, check the Analytics tab for data-driven insights about your field, or ask about specific crops, pests, fertilizers, or weather!";
    }
}
