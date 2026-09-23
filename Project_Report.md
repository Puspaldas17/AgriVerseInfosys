# FarmVerse — Precision Agriculture Management Platform
## Internship Project Report | Infosys Springboard Virtual Internship 6.0

**Submitted By:** Puspal Das | **Team:** Team C | **Project Guide:** Ragul S | **Date:** September 2026

---

## 1. Project Title

**FarmVerse — Precision Agriculture Management Platform**

A full-stack, AI-powered web application designed to bridge the technological gap in Indian agriculture by providing farmers with real-time AI advisory, computer-vision pest detection, a digital marketplace, gamified learning, and an administrative oversight system.

---

## 2. Project Objective

The primary objective of this internship project was to design, develop, and deploy a comprehensive Precision Agriculture Management Platform that:

- Provides **real-time, contextual AI advisory** to farmers for crop management, fertilizer selection, and irrigation planning using Large Language Models (LLMs).
- Enables **computer-vision-based pest and disease detection** from leaf photographs uploaded by farmers.
- Creates a **digital marketplace** for direct farmer-to-buyer trading of agricultural products, seeds, equipment, and fertilizers.
- Implements a **gamification engine** to drive farmer engagement and behavioral change through XP, Daily Missions, and Leaderboards.
- Provides administrators with a **Command Center** to moderate the marketplace, manage users, and maintain platform integrity.
- Demonstrates proficiency in full-stack software engineering using: Java 21, Spring Boot 4.x, MongoDB Atlas, Spring Security with JWT, and Google Gemini AI.

---

## 3. Project Description

### Overview

FarmVerse is a single, unified platform that replaces the fragmented digital experience of Indian farmers. Prior to this platform, a farmer would use one app for weather, a different website for crop prices, a WhatsApp group for pest advice, and an unregulated channel for selling produce. FarmVerse consolidates all these functions into a single, secure, AI-powered ecosystem.

### Approach

The application was engineered using a modern three-tier architecture:

- **Presentation Tier:** A responsive, lightweight frontend using native HTML5, CSS3, and Vanilla JavaScript. The choice to avoid heavy frameworks like React was intentional — ensuring lightning-fast load times for farmers with low-bandwidth rural internet connections.
- **Application Tier:** A robust Spring Boot 4.x backend with 9 specialized REST Controllers exposing a secure JSON API. Spring Security with JWT ensures only authenticated users access protected resources.
- **Data Tier:** MongoDB Atlas, a cloud-hosted NoSQL document database, stores all platform data in a flexible document format, making it easy to evolve the data model as new features are added.

### Real-World Impact

- **Democratization of AI:** By embedding Google Gemini AI directly into the farmer's dashboard, FarmVerse makes cutting-edge AI accessible to rural farmers who previously had no access to such tools.
- **Market Transparency:** The digital marketplace eliminates middlemen and allows farmers to list produce directly for buyers at their own prices, potentially increasing farmer income significantly.
- **Food Security:** By helping farmers identify crop diseases early and plan sowing seasons correctly, the platform directly contributes to improving agricultural yield and national food security.

---

## 4. Technology Stack

### Backend Technologies

| Technology | Version | Role |
|---|---|---|
| Java | 21 (LTS) | Core application programming language |
| Spring Boot | 4.1.0 | Primary backend web framework |
| Spring Web MVC | Built-in | REST API routing and request handling |
| Spring Security | 6.x | Authentication, authorization, security filters |
| Spring Data MongoDB | Built-in | Object-Document Mapping (ODM) for MongoDB |
| JJWT (io.jsonwebtoken) | 0.12.7 | JWT token creation, signing, and validation |
| Lombok | Latest | Annotation-based boilerplate elimination |
| Spring Validation | Built-in | Request body validation via @Valid and JSR-380 |
| RestTemplate | Built-in | HTTP client for calling Google Gemini API |
| Maven | 3.x | Build automation and dependency management |
| Jackson | Spring Built-in | Java-to-JSON serialization/deserialization |

### Frontend Technologies

| Technology | Role |
|---|---|
| HTML5 | Semantic page structure for all 9 frontend pages |
| CSS3 | Visual styling, animations, glassmorphism UI effects |
| Vanilla JavaScript | Business logic, DOM manipulation, and API calls |
| Fetch API | Asynchronous REST API calls to the Spring Boot backend |
| LocalStorage API | Client-side JWT token and user data persistence |

### Cloud and External Services

| Service | Role |
|---|---|
| MongoDB Atlas | Cloud-hosted NoSQL database (Free M0 Cluster) |
| Google Gemini 3.6 Flash | Large Language Model for AI advisory and pest analysis |
| GitHub | Source code version control and repository hosting |

---

## 5. System Architecture

### Data Flow (End-to-End)

```
Step 1: Farmer types question in dashboard.html
        (Vanilla JS captures the input)

Step 2: JavaScript sends HTTP POST to /api/ai/chat
        with JWT Bearer token in Authorization header

Step 3: JwtAuthenticationFilter intercepts the request
        Validates JWT signature and extracts user email

Step 4: AIController.java receives the validated request
        Injects system prompt: "You are an expert agricultural advisor..."
        Constructs Google Gemini API request payload

Step 5: RestTemplate sends HTTP POST to Google Gemini servers
        using GEMINI_API_KEY loaded from environment variables

Step 6: Google Gemini LLM processes question, returns JSON
        (with retry logic for 503 errors: 3 attempts, 1.5s apart)

Step 7: AIController extracts text from Gemini JSON response
        Logs the interaction to advisory_history collection in MongoDB
        Returns clean text response to frontend

Step 8: Dashboard JavaScript receives the response
        Removes the typing animation
        Renders AI advice in the chat window
```

### MVC Design Pattern

- **Model:** Entity classes (User.java, MarketplaceListing.java, etc.) represent MongoDB documents
- **View:** HTML/CSS/JS frontend files served as static resources from /resources/static/
- **Controller:** 9 Spring @RestController classes handle routing and orchestration
- **Service:** Business logic layer sits between Controllers and Repositories
- **Repository:** Spring Data MongoDB interfaces provide database access with zero boilerplate

---

## 6. Module-Wise Feature Details

### Module 1: Authentication and Security

**Key Components:**
- `AuthController.java`: Handles /api/auth/register and /api/auth/login
- `JwtService.java`: Generates and validates JWT tokens with HMAC-SHA256 signatures
- `JwtAuthenticationFilter.java`: Intercepts every HTTP request to validate Bearer token
- `SecurityConfig.java`: Defines SecurityFilterChain with endpoint-level access rules
- `UserService.java`: Registration with BCrypt password hashing and duplicate email detection

**Workflow:**
1. Farmer submits email and password via login.html
2. AuthController passes credentials to Spring AuthenticationManager
3. AuthenticationManager uses BCrypt to compare input password with stored hash
4. If valid, JwtService generates a signed JWT token (valid for 24 hours)
5. Token returned to frontend, stored in localStorage
6. All subsequent requests include `Authorization: Bearer {token}` header

### Module 2: AI Agricultural Advisory System

**Description:** Integrates Google Gemini 3.6 Flash LLM for real-time, contextual crop management advice.

**Key Technical Details:**
- **System Prompt Injection:** Before every API call, the backend prepends a system-level instruction to constrain the AI to agricultural topics only.
- **Retry Mechanism:** Custom retry loop (max 3 retries, 1.5s sleep) handles HTTP 503 errors.
- **API Key Security:** GEMINI_API_KEY loaded via `@Value("${gemini.api.key}")` from environment variables.

**AI Response Topics Covered:**
- Fertilizer schedules (NPK ratios, micronutrients, doses)
- Irrigation planning (drip vs. flood, moisture thresholds)
- Organic farming practices
- Pest and disease prevention
- Crop rotation advice
- Season-wise sowing recommendations

### Module 3: Computer-Vision Pest and Disease Detector

**Description:** Allows farmers to upload a photograph of a diseased crop leaf. The system processes the image using Google Gemini's multimodal (vision + text) capability and returns a diagnosis.

**Output Includes:**
- Detected pest or disease name (e.g., "Fall Armyworm", "Leaf Blight")
- Severity assessment
- Immediate action recommendations (chemical and organic treatments)
- Dosage and application timing

### Module 4: Digital Farmer's Marketplace

**Description:** A direct-to-buyer trading platform with a moderation workflow to prevent fraudulent listings.

**Listing Lifecycle:**
```
Farmer submits listing
    |
    v
Status: PENDING (not visible to public)
    |
    v
Admin reviews in Command Center
    |
   /|\
  / | \
APPROVED  REJECTED
(visible) (removed)
  |
  v
Farmer marks as SOLD
```

**Listing Categories:** Crop, Vegetable, Fruit, Fertilizer, Equipment

### Module 5: Crop Sowing Calendar

**Description:** Visual, data-driven reference for farmers to plan sowing and harvesting activities.

**Seasonal Categories:**
- **Kharif (June-Oct):** Rice, Maize, Mango, Cotton, Groundnut
- **Rabi (Oct-Mar):** Tomato, Cucumber, Chickpea, Mustard, Barley
- **Summer (Mar-Jun):** Okra, Watermelon, Muskmelon, Moong Dal

### Module 6: Gamification Engine

**Description:** Applies game design psychology to drive consistent farmer engagement and behavioral adoption of good farming practices.

**Daily Missions (Examples):**
- "Log Soil Moisture Today" (+10 XP)
- "Ask the AI Assistant a question" (+15 XP)
- "Check Weather Forecast" (+5 XP)

**XP Leveling System:**
- Level 1: 0-100 XP (Seed Farmer)
- Level 2: 101-300 XP (Growing Farmer)
- Level 3: 301-600 XP (Expert Farmer)
- Level 4: 601+ XP (Master Farmer)

**Village Leaderboard:** Regional rankings of top farmers by XP, encouraging healthy competition.

### Module 7: Admin Command Center

**Description:** A completely separate, dark-themed, secured dashboard accessible only to ADMIN role users.

**Features:**
- **Overview Dashboard:** Live counts of total users, active farmers, active sessions, and admins — pulled directly from MongoDB
- **User Management Table:** Full user list with role, land size, language, and subscription plan. Admins can change roles and suspend accounts.
- **Marketplace Moderation:** View all listings filtered by status. One-click Approve or Reject.
- **Dispute Resolution:** Full list of buyer-seller disputes with status management.
- **Crop Calendar Management:** Full CRUD operations for crop calendar database.
- **Live Activity Feed:** Real-time chronological log of significant events.

---

## 7. Database Design

### Choice of NoSQL over SQL

MongoDB was chosen for the following reasons:

1. **Schema Flexibility:** Farmers have varying profiles. MongoDB's document model handles this naturally without requiring NULL columns.
2. **JSON Compatibility:** The backend communicates in JSON. MongoDB stores data natively in BSON (Binary JSON), eliminating translation overhead.
3. **Cloud Scalability:** MongoDB Atlas provides horizontal scaling (sharding) out of the box.
4. **Embedded Documents:** Gamification state (missionsState as a Boolean array) stored directly inside User document, no JOIN table needed.

### Collections (6 Total)

1. **users** — Core user accounts with embedded gamification state
2. **marketplace_listings** — Agricultural product and equipment listings
3. **disputes** — Buyer-seller conflict records
4. **crop_calendars** — Seasonal crop sowing data
5. **contact_requests** — Contact form submissions
6. **advisory_history** — Log of all AI chat and pest detection interactions

### User Document Schema

```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String (unique, indexed)",
  "password": "String (BCrypt hashed)",
  "role": "String (USER | ADMIN)",
  "xp": "Integer (default: 40)",
  "level": "Integer (default: 1)",
  "missionsState": "[Boolean]",
  "suspended": "Boolean (default: false)",
  "phone": "String",
  "soilType": "String",
  "landSize": "Double (acres)",
  "language": "String (default: English)",
  "subscriptionPlan": "String (FREE | PREMIUM)"
}
```

---

## 8. API Design and Controller Details

### REST API Design Principles

- **Stateless:** Each request contains all information needed (JWT token)
- **Resource-Based URLs:** /api/marketplace/listings (noun, not verb)
- **Correct HTTP Verbs:** GET for fetching, POST for creating, PATCH for partial updates
- **Consistent JSON Responses:** All endpoints return standardized JSON with appropriate HTTP status codes

### All 9 Controllers Summary

| Controller | Base Path | Methods | Role Required |
|---|---|---|---|
| AuthController | /api/auth | POST | None (Public) |
| UserController | /api/user | GET, POST | Authenticated |
| AIController | /api/ai | POST | Authenticated |
| PestController | /api/pest | POST | Authenticated |
| MarketplaceController | /api/marketplace | GET, POST | None (Public) |
| CropCalendarController | /api/crop-calendar | GET | None (Public) |
| ContactRequestController | /api/contact | POST | None (Public) |
| AdminController | /api/admin | GET, PATCH, DELETE | ADMIN |
| AdminMarketplaceController | /api/admin/marketplace | GET, PATCH | ADMIN |

---

## 9. Security Implementation

### Multi-Layer Security Architecture

**Layer 1 — CORS Filter:** Allows the frontend JavaScript to make API calls to the backend server without browser-level blocking.

**Layer 2 — JWT Authentication Filter:** JwtAuthenticationFilter.java intercepts every request, extracts the Bearer token, validates the JWT signature, and sets the authentication context.

**Layer 3 — SecurityFilterChain:** Defines access control rules:
- Public endpoints: /api/auth/**, /api/marketplace/**, static files
- Admin-only endpoints: /api/admin/** (requires hasRole("ADMIN"))
- All other endpoints: require any valid authenticated user

**Layer 4 — BCrypt Password Hashing:** All passwords hashed before storage. Raw passwords are never persisted.

**Layer 5 — Account Suspension:** AuthController checks user.isSuspended() after successful credential validation. Returns HTTP 403 even with correct credentials if account is suspended.

---

## 10. Key Code Snippets

### JWT Authentication (AuthController.java)

```java
@PostMapping("/login")
public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
    );
    User user = userService.findByEmail(request.getEmail());
    if (user.isSuspended()) {
        return ResponseEntity.status(403).body(new AuthResponse("Account Suspended", "NONE"));
    }
    String token = jwtService.generateToken(user.getEmail());
    return ResponseEntity.ok(new AuthResponse(token, user.getRole()));
}
```

### Google Gemini AI with Retry Logic (AIController.java)

```java
int maxRetries = 3;
for (int attempt = 1; attempt <= maxRetries; attempt++) {
    try {
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
        if (response.getBody() != null && response.getBody().containsKey("candidates")) {
            return extractTextFromGeminiResponse(response.getBody());
        }
    } catch (Exception e) {
        if (attempt < maxRetries) {
            Thread.sleep(1500);
        } else {
            return "The AI is currently experiencing high demand. Please try again shortly.";
        }
    }
}
```

### Spring Security Filter Chain (SecurityConfig.java)

```java
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**", "/api/marketplace/**", "/*.html").permitAll()
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated()
        )
        .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
}
```

### MongoDB User Entity with Gamification (User.java)

```java
@Document(collection = "users")
@Data @Builder
public class User {
    @Id private String id;
    @Indexed(unique = true) private String email;
    private String password;
    private String role;
    @Builder.Default private int xp = 40;
    @Builder.Default private int level = 1;
    private List<Boolean> missionsState;
    @Builder.Default private boolean suspended = false;
    private String soilType;
    private Double landSize;
    @Builder.Default private String subscriptionPlan = "FREE";
}
```

---

## 11. Challenges Faced and Resolutions

| Challenge | Problem | Resolution |
|---|---|---|
| AI API Deprecation | Google deprecated the older Gemini endpoint, causing 404 errors | Updated AIController to use latest Gemini 3.6 Flash endpoint URL |
| HTTP 503 AI Errors | Intermittent server overload caused chatbot to crash | Engineered custom 3-retry loop with 1.5s delay in AIController |
| Credential Security | Hardcoded database passwords exposed in source code | Moved all secrets to system environment variables (${MONGO_PASSWORD}) |
| Frontend Route Guarding | Users could access admin-dashboard.html directly via URL | Added JavaScript session guards that redirect unauthorized users |

---

## 12. Learnings and Skills Acquired

**Technical Skills:**
- Java 21 and Spring Boot 4.x for enterprise REST API development
- JWT authentication and stateless session management
- Spring Security with SecurityFilterChain and role-based authorization
- MongoDB Atlas NoSQL document database design and Spring Data MongoDB ORM
- Google Gemini API integration using RestTemplate with custom retry logic
- Secure credential management using Spring environment variable injection
- Frontend development with HTML5, CSS3, and Vanilla JavaScript
- Asynchronous API communication using the browser Fetch API

**Professional Skills:**
- Full-stack system architecture design from scratch
- API design following REST principles
- Security-first development mindset
- Professional technical documentation writing

---

## 13. Future Enhancements

1. **Voice-to-Text AI Advisory** — Allow farmers to speak queries in regional languages and receive spoken responses
2. **IoT Sensor Integration** — Connect soil sensors to transmit real-time moisture and nitrogen data
3. **Blockchain Marketplace** — Immutable product certification and transaction ledger
4. **ML Yield Prediction** — Python/TensorFlow microservice for harvest yield forecasting
5. **Native Mobile Application** — Android and iOS apps consuming the same Spring Boot API
6. **Live Weather Data Integration** — OpenWeatherMap API for automated irrigation alerts

---

## 14. Conclusion

The FarmVerse internship project was a comprehensive, end-to-end software engineering experience that resulted in a fully functional, enterprise-grade Precision Agriculture Management Platform. From designing the MongoDB schema to securing the API with JWT, integrating Google Gemini AI, and building a gamified farmer dashboard — every phase of the SDLC was executed in full.

This project demonstrates that modern technology — specifically AI, cloud databases, and secure web architectures — can be applied directly to solving India's pressing agricultural challenges. FarmVerse has the potential to meaningfully improve the livelihoods of millions of Indian farmers.

---

## 15. Acknowledgements

I sincerely thank **Infosys Springboard** for providing the platform and resources for this internship. I express my deepest gratitude to my Project Guide, **Ragul S**, for his technical expertise and patient mentorship. I am also deeply thankful to my fellow teammates in **Team C** for their collaborative spirit and dedication.

---

*FarmVerse — Precision Agriculture Management Platform*
*Infosys Springboard Virtual Internship 6.0 | Team C | 2026*
