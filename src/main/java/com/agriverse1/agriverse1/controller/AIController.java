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
        try {
            if (geminiApiKey == null || geminiApiKey.contains("YOUR_API_KEY_HERE")) {
                return "Gemini API Key is missing. Please configure it in your environment variables before asking questions!";
            }

            String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + geminiApiKey;

            // System prompt injection
            String fullPrompt = "You are an expert agricultural advisor for FarmVerse. Be concise, practical, and friendly. Answer this farmer's question: " + prompt;

            Map<String, String> textPart = Map.of("text", fullPrompt);
            Map<String, List<Map<String, String>>> partsMap = Map.of("parts", List.of(textPart));
            Map<String, List<Map<String, List<Map<String, String>>>>> requestBody = Map.of("contents", List.of(partsMap));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, List<Map<String, List<Map<String, String>>>>>> entity = new HttpEntity<>(requestBody, headers);

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
            return "Sorry, I could not generate a response at this time.";
        } catch (Exception e) {
            System.err.println("Gemini API Error: " + e.getMessage());
            return "An error occurred while connecting to the AI: " + e.getMessage();
        }
    }
}