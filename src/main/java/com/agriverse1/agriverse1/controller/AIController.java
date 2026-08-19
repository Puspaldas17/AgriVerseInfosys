package com.agriverse1.agriverse1.controller;

import com.agriverse1.agriverse1.dto.ChatRequestDto;
import com.agriverse1.agriverse1.dto.ChatResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    @PostMapping("/chat")
    public ResponseEntity<ChatResponseDto> processChat(@RequestBody ChatRequestDto request) {
        String msg = request.getMessage().toLowerCase();
        String response = generateSimulatedResponse(msg);
        return ResponseEntity.ok(new ChatResponseDto(response));
    }

    private String generateSimulatedResponse(String msg) {
        if (msg.contains("weather") || msg.contains("rain")) {
            return "Based on your location, expect moderate rainfall over the next 48 hours. I recommend delaying any pesticide application until the skies clear up to prevent run-off.";
        }
        if (msg.contains("tomato") || msg.contains("blight")) {
            return "For tomatoes, Early Blight is common in high humidity. Ensure proper spacing between plants for airflow and consider a preventative copper-based fungicide spray.";
        }
        if (msg.contains("fertilizer") || msg.contains("urea")) {
            return "When applying nitrogen-based fertilizers like urea, it's best done in split doses. Try applying 50% now and the rest at the flowering stage for optimal yield.";
        }
        if (msg.contains("pest") || msg.contains("bug")) {
            return "Pest management is crucial! If you see aphids, a simple neem oil solution (5ml per liter of water) sprayed in the early morning can be highly effective and organic.";
        }
        if (msg.contains("yield") || msg.contains("harvest")) {
            return "To maximize harvest yield, maintain consistent soil moisture and ensure you're tracking your daily crop growth metrics in the Analytics tab.";
        }
        if (msg.contains("hello") || msg.contains("hi")) {
            return "Hello there! I'm your FarmVerse AI Assistant. Ask me about weather forecasts, crop diseases, fertilizer recommendations, or general farming advice!";
        }
        
        // Default response for unrecognized queries
        return "That's an interesting question about farming! While I'm a simulated backend engine right now, normally I'd analyze our massive agricultural database to tell you the exact best practices for that specific issue. Is there anything else I can help with?";
    }
}
