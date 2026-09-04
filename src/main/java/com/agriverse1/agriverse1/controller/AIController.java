package com.agriverse1.agriverse1.controller;

import com.agriverse1.agriverse1.advisoryhistory.AdvisoryHistoryService;
import com.agriverse1.agriverse1.dto.ChatRequestDto;
import com.agriverse1.agriverse1.dto.ChatResponseDto;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

/**
 * AI Chat endpoint — powered by Google Gemini 1.5 Flash.
 * POST /api/ai/chat  — Send a message, receive contextual farming advice.
 */
@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AdvisoryHistoryService advisoryHistoryService;
    private final RestTemplate restTemplate;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public AIController(AdvisoryHistoryService advisoryHistoryService) {
        this.advisoryHistoryService = advisoryHistoryService;
        this.restTemplate = new RestTemplate();
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatResponseDto> processChat(
            @RequestBody ChatRequestDto request,
            Authentication authentication) {

        String message = request.getMessage();
        String response = generateGeminiResponse(message);

        /*
         * Save the interaction after generating the response.
         */
        advisoryHistoryService.saveAiAssistantHistory(
                authentication.getName(),
                message,
                response
        );

        return ResponseEntity.ok(new ChatResponseDto(response));
    }

    private String generateGeminiResponse(String prompt) {
        if (geminiApiKey == null || geminiApiKey.contains("YOUR_API_KEY_HERE")) {
            return "Gemini API Key is missing. Please configure it in your environment variables before asking questions!";
        }

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=" + geminiApiKey;

        // System prompt injection
        String fullPrompt = "You are an expert agricultural advisor for FarmVerse. Be concise, practical, and friendly. Answer this farmer's question: " + prompt;

        Map<String, String> textPart = Map.of("text", fullPrompt);
        Map<String, List<Map<String, String>>> partsMap = Map.of("parts", List.of(textPart));
        Map<String, List<Map<String, List<Map<String, String>>>>> requestBody = Map.of("contents", List.of(partsMap));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, List<Map<String, List<Map<String, String>>>>>> entity = new HttpEntity<>(requestBody, headers);

        // Retry up to 3 times to handle temporary 503 overload errors
        int maxRetries = 3;
        for (int attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
                Map<String, Object> body = response.getBody();

                if (body != null && body.containsKey("candidates")) {
                    List<Map<String, Object>> candidates = (List<Map<String, Object>>) body.get("candidates");
                    if (!candidates.isEmpty()) {
                        Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                        List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                        if (parts != null && !parts.isEmpty()) {
                            return (String) parts.get(0).get("text");
                        }
                    }
                }
                return "Sorry, I could not generate a response at this time. Please try again.";

            } catch (Exception e) {
                System.err.println("Gemini API attempt " + attempt + " failed: " + e.getMessage());
                if (attempt < maxRetries) {
                    try { Thread.sleep(1500); } catch (InterruptedException ie) { Thread.currentThread().interrupt(); }
                } else {
                    return "The AI is currently experiencing high demand. Please wait a few seconds and try your question again! 🌱";
                }
            }
        }
        return "Sorry, I could not connect to the AI at this time.";
    }
}