# ?? FarmVerse — Precision Agriculture Management Platform

> **Empowering every farmer with AI-driven crop advisory, real-time market access, and smart disease detection — all in one platform.**

![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.0-brightgreen?style=for-the-badge&logo=springboot)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/Security-JWT-blue?style=for-the-badge&logo=jsonwebtokens)
![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=for-the-badge&logo=google)

---

## ?? Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [API Endpoints Reference](#-api-endpoints-reference)
- [Database Schema](#-database-schema)
- [Prerequisites](#-prerequisites)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Frontend Pages](#-frontend-pages)
- [Security Model](#-security-model)
- [Future Enhancements](#-future-enhancements)

---

## ?? Project Overview

**FarmVerse** is a full-stack, AI-powered Precision Agriculture Management Platform built for the Indian agricultural sector. It bridges the technological gap between modern AI capabilities and rural farming communities by providing a unified ecosystem where farmers can:

- Get **real-time AI crop advisory** powered by Google Gemini 3.6 Flash
- Detect **crop diseases and pests** via image upload
- Trade produce and equipment on a **digital marketplace**
- Plan their harvests using a **seasonal crop sowing calendar**
- Track progress through a **gamification engine** (XP, Levels, Daily Missions)

The platform is secured with enterprise-grade **JWT (JSON Web Token)** authentication and role-based access control (RBAC), separating regular Farmer functionality from the Admin Command Center.

---

## ? Key Features

### Farmer-Facing Features

| Feature | Description |
|---|---|
| AI Agricultural Advisor | Real-time generative AI chat (Google Gemini 3.6 Flash) for crop, fertilizer, and irrigation advice |
| Pest and Disease Detector | Upload a leaf photo to detect pests and diseases using computer vision |
| Digital Marketplace | Browse, list, and sell agricultural produce and equipment |
| Crop Sowing Calendar | View crop-wise sowing and harvesting windows by season (Kharif, Rabi, Summer) |
| Gamification Engine | Earn XP, level up, complete Daily Missions, and compete on Village Leaderboards |
| Farm Analytics | Track soil moisture trends, temperature logs, and pest outbreak risk charts |
| Advisory History | A complete audit log of all AI queries and pest detection results |
| Farmer Profile | Store soil type, land size, language preference, and contact details |

### Admin Command Center Features

| Feature | Description |
|---|---|
| Overview Dashboard | Real-time count of total users, active sessions, and admins |
| User Management | View all users, change roles (Farmer/Vet/Admin), suspend accounts |
| Marketplace Moderation | Approve or Reject marketplace listings before they go live |
| Dispute Resolution | Manage buyer-seller disputes and mark them as RESOLVED or DISMISSED |
| Crop Calendar CRUD | Add, Edit, and Delete crop sowing calendar entries |
| Live Activity Feed | Real-time log of logins, registrations, and security events |

---

## Tech Stack

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Java | 21 (LTS) | Core programming language |
| Spring Boot | 4.1.0 | Backend REST API framework |
| Spring Security | 6.x | Authentication and Authorization |
| Spring Data MongoDB | Latest | Database ORM layer |
| jjwt (JJWT Library) | 0.12.7 | JWT token generation and validation |
| Lombok | Latest | Boilerplate code reduction |
| Maven | 3.x | Dependency management and build tool |
| RestTemplate | Built-in | HTTP client for Google Gemini API calls |

### Frontend

| Technology | Purpose |
|---|---|
| HTML5 | Structure of all web pages |
| CSS3 | Styling, animations, and responsive layouts |
| Vanilla JavaScript | Dynamic interactions, API calls, and rendering |
| Fetch API | Asynchronous HTTP requests to the backend |

### Database and Cloud

| Technology | Purpose |
|---|---|
| MongoDB Atlas | Cloud-hosted NoSQL document database |
| Google Gemini 3.6 Flash | Large Language Model (LLM) for AI advisory |

---

## System Architecture

### High-Level Architecture Overview

```mermaid
graph TB
    subgraph USERS["👥 Users"]
        F["🌾 Farmer"]
        A["👨‍💼 Admin"]
    end

    subgraph FRONTEND["🖥️ Presentation Tier — HTML5 / CSS3 / Vanilla JS"]
        PUB["Public Pages\nindex.html | login.html | signup.html"]
        FARM["Farmer Dashboard\ndashboard.html | marketplace.html\ncalendar.html | profile.html"]
        ADM["Admin Command Center\nadmin-login.html | admin-dashboard.html"]
    end

    subgraph SECURITY["🔐 Security Layer — Spring Security + JWT"]
        CORS["CORS Filter"]
        JWT["JWT Auth Filter\nValidates Bearer Token"]
        RBAC["Role-Based Access Control\nUSER vs ADMIN"]
    end

    subgraph BACKEND["⚙️ Application Tier — Spring Boot 4.1 on Java 21"]
        AC["AuthController\n/api/auth/**"]
        UC["UserController\n/api/user/**"]
        AIC["AIController\n/api/ai/**"]
        PC["PestController\n/api/pest/**"]
        MC["MarketplaceController\n/api/marketplace/**"]
        CC["CropCalendarController\n/api/crop-calendar/**"]
        ADMC["AdminController\n/api/admin/**"]
        AMC["AdminMarketplaceController\n/api/admin/marketplace/**"]
    end

    subgraph SERVICE["🔧 Service and Repository Layer"]
        US["UserService"]
        AHS["AdvisoryHistoryService"]
        REPO["Spring Data MongoDB Repositories"]
    end

    subgraph DATA["☁️ Data Tier — Cloud Storage"]
        MDB[("🗄️ MongoDB Atlas\nusers | marketplace_listings\ndisputes | crop_calendars\ncontact_requests | advisory_history")]
        GEMINI["🤖 Google Gemini 3.6 Flash\nAI Advisory + Pest Detection\n3-retry fallback logic"]
    end

    F --> PUB & FARM
    A --> ADM
    PUB & FARM & ADM -->|HTTP Request + JWT Token| CORS
    CORS --> JWT --> RBAC
    RBAC --> AC & UC & AIC & PC & MC & CC
    RBAC -->|ADMIN role only| ADMC & AMC
    AC & UC --> US --> REPO --> MDB
    AIC & PC --> AHS --> REPO
    AIC & PC -->|REST API call| GEMINI
```

---

### Step-by-Step Request Flow (AI Chat Example)

```mermaid
sequenceDiagram
    participant F as 🌾 Farmer Browser
    participant SEC as 🔐 JWT Filter
    participant CTL as ⚙️ AIController
    participant SVC as 📝 AdvisoryHistoryService
    participant DB as 🗄️ MongoDB Atlas
    participant AI as 🤖 Google Gemini AI

    Note over F,AI: Farmer asks: "What fertilizer is best for paddy?"

    F->>+SEC: POST /api/ai/chat (Bearer JWT_TOKEN)
    SEC->>SEC: Validate JWT Signature (HMAC-SHA256)
    SEC->>SEC: Extract user email from token
    SEC->>+CTL: Forward authenticated request

    CTL->>CTL: Inject agricultural system prompt
    CTL->>CTL: Load GEMINI_API_KEY from env vars

    loop Retry Logic (max 3 attempts, 1.5s delay)
        CTL->>+AI: POST to Gemini API (question + prompt)
        alt Success HTTP 200
            AI-->>-CTL: AI response JSON with farming advice
        else HTTP 503 Server Overload
            CTL->>CTL: Wait 1.5s, retry...
        end
    end

    CTL->>+SVC: Log interaction to Advisory History
    SVC->>+DB: Save (email, query, response, timestamp)
    DB-->>-SVC: Saved OK
    SVC-->>-CTL: Done
    CTL-->>-F: Return AI advice text to dashboard
```

---

### Security Filter Chain Flow

```mermaid
flowchart TD
    REQ(["📨 Incoming HTTP Request"]) --> CORS

    CORS{"🌐 CORS Filter
Check Origin"} -->|Allowed| JWT
    CORS -->|Blocked| R1(["❌ 403 Forbidden"])

    JWT{"🔑 JWT Auth Filter
Check Authorization Header"} -->|Valid Token| RBAC
    JWT -->|No Token| ISOPEN
    JWT -->|Invalid/Expired| R2(["❌ 401 Unauthorized"])

    ISOPEN{"📂 Is Public
Endpoint?"} -->|YES
/api/auth/**
/api/marketplace/**| CTRL
    ISOPEN -->|NO - Protected| R2

    RBAC{"👤 Role
Check"} -->|Farmer + correct route| CTRL
    RBAC -->|Needs ADMIN
but is USER| R3(["❌ 403 Forbidden"])
    RBAC -->|ADMIN role| CTRL

    CTRL["⚙️ Spring Controller
(AuthController, AIController, etc.)"] --> SVC
    SVC["🔧 Service Layer
(UserService, AdvisoryHistoryService)"] --> DB
    DB[("🗄️ MongoDB Atlas
Cloud Database")]
```

---

### Database Schema (Entity Relationship)

```mermaid
erDiagram
    USERS {
        ObjectId id PK
        String email UK
        String password_BCrypt
        String role "USER or ADMIN"
        Integer xp "default 40"
        Integer level "default 1"
        BooleanArray missionsState
        Boolean suspended
        String soilType
        Double landSize_acres
        String subscriptionPlan "FREE or PREMIUM"
    }

    MARKETPLACE_LISTINGS {
        ObjectId id PK
        String title
        String category "Crop-Veg-Fruit-Equipment"
        String price
        String farmerName
        String status "PENDING-APPROVED-REJECTED-SOLD"
        LocalDateTime createdAt
    }

    DISPUTES {
        ObjectId id PK
        String buyerName
        String sellerName
        String reason
        String status "OPEN-RESOLVED-DISMISSED"
        LocalDateTime createdAt
    }

    CROP_CALENDARS {
        ObjectId id PK
        String cropName
        String season "KHARIF-RABI-SUMMER"
        String sowingWindow
        String harvestWindow
        String status "APPROVED-PENDING"
    }

    ADVISORY_HISTORY {
        ObjectId id PK
        String userEmail FK
        String queryText
        String responseText
        String type "AI_CHAT or PEST_DETECTION"
        LocalDateTime timestamp
    }

    USERS ||--o{ ADVISORY_HISTORY : "generates"
    USERS ||--o{ MARKETPLACE_LISTINGS : "creates"
```


## Project Structure

```
FarmVerse-Precision-Agriculture-Management-Platform/
|
|-- pom.xml                              Maven dependency configuration
|-- Dockerfile                           Docker container configuration
|-- README.md                            This file
|-- Project_Report.md                    Detailed project report (Markdown)
|-- Project_Report.html                  Detailed project report (HTML)
|
|-- src/
|   |-- main/
|   |   |-- java/com/agriverse1/agriverse1/
|   |   |   |
|   |   |   |-- Agriverse1Application.java        Spring Boot entry point
|   |   |   |
|   |   |   |-- controller/                       REST API Controllers
|   |   |   |   |-- AuthController.java           Register and Login (JWT)
|   |   |   |   |-- UserController.java           Profile + XP sync
|   |   |   |   |-- AIController.java             Google Gemini AI chat
|   |   |   |   |-- PestController.java           Image-based pest detection
|   |   |   |   |-- MarketplaceController.java    Public marketplace APIs
|   |   |   |   |-- AdminController.java          Admin dashboard APIs
|   |   |   |   |-- AdminMarketplaceController.java  Moderation APIs
|   |   |   |   |-- CropCalendarController.java   Crop calendar CRUD
|   |   |   |   |-- ContactRequestController.java Contact form
|   |   |   |
|   |   |   |-- entity/                           MongoDB Document Models
|   |   |   |   |-- User.java                     User + Gamification fields
|   |   |   |   |-- MarketplaceListing.java       Product listing model
|   |   |   |   |-- Dispute.java                  Buyer-seller dispute model
|   |   |   |   |-- CropCalendar.java             Crop calendar entry model
|   |   |   |   |-- ContactRequest.java           Contact form submission
|   |   |   |
|   |   |   |-- security/                         JWT Security Layer
|   |   |   |   |-- SecurityConfig.java           SecurityFilterChain config
|   |   |   |   |-- JwtService.java               Token generation/validation
|   |   |   |   |-- JwtAuthenticationFilter.java  Per-request JWT interceptor
|   |   |   |
|   |   |   |-- service/                          Business Logic Layer
|   |   |   |   |-- UserService.java              User registration/lookup
|   |   |   |   |-- CustomUserDetailsService.java Spring Security bridge
|   |   |   |
|   |   |   |-- repository/                       MongoDB Data Access Layer
|   |   |   |   |-- UserRepository.java
|   |   |   |   |-- MarketplaceListingRepository.java
|   |   |   |   |-- DisputeRepository.java
|   |   |   |   |-- CropCalendarRepository.java
|   |   |   |   |-- ContactRequestRepository.java
|   |   |   |
|   |   |   |-- dto/                              Data Transfer Objects
|   |   |   |   |-- LoginRequest.java
|   |   |   |   |-- RegisterRequest.java
|   |   |   |   |-- AuthResponse.java
|   |   |   |   |-- ApiResponse.java
|   |   |   |   |-- ProfileUpdateDto.java
|   |   |   |   |-- UserSyncDto.java
|   |   |   |
|   |   |   |-- advisoryhistory/                  AI History Logging
|   |   |   |   |-- AdvisoryHistory.java
|   |   |   |   |-- AdvisoryHistoryRepository.java
|   |   |   |   |-- AdvisoryHistoryService.java
|   |   |   |
|   |   |   |-- exception/                        Global Exception Handling
|   |   |   |   |-- GlobalExceptionHandler.java
|   |   |   |
|   |   |   |-- config/                           Bean Configuration
|   |   |       |-- AppConfig.java                RestTemplate bean
|   |   |
|   |   |-- resources/
|   |       |-- application.properties            App configuration
|   |       |-- static/                           Frontend Files
|   |           |-- index.html                    Public landing page
|   |           |-- login.html                    Farmer login page
|   |           |-- signup.html                   Registration page
|   |           |-- dashboard.html                Farmer dashboard (main app)
|   |           |-- marketplace.html              Digital marketplace
|   |           |-- calendar.html                 Crop sowing calendar
|   |           |-- profile.html                  Farmer profile editor
|   |           |-- admin-login.html              Admin login portal
|   |           |-- admin-dashboard.html          Admin command center
|   |           |-- css/                          Stylesheets
|   |           |-- js/                           JavaScript files
|   |           |-- images/                       Static images
|
|-- target/                                       Maven build output
```

---

## API Endpoints Reference

### Authentication (/api/auth)

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | /api/auth/register | Public | Register a new farmer account |
| POST | /api/auth/login | Public | Login and receive a JWT token |

### User Profile and Gamification (/api/user)

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | /api/user/profile | JWT | Fetch the logged-in user full profile |
| POST | /api/user/profile | JWT | Update farmer profile (soil, land, language) |
| POST | /api/user/sync | JWT | Sync XP, Level, and Daily Mission state |

### AI Advisory (/api/ai)

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | /api/ai/chat | JWT | Send a farming question, receive AI-generated advice |

### Pest Detection (/api/pest)

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | /api/pest/analyze | JWT | Upload a leaf image for disease/pest analysis |

### Marketplace (/api/marketplace)

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | /api/marketplace/listings | Public | Get all APPROVED listings |
| POST | /api/marketplace/listings | Public | Submit a new listing (saves as PENDING) |
| POST | /api/marketplace/disputes | Public | Submit a buyer-seller dispute |

### Crop Calendar (/api/crop-calendar)

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | /api/crop-calendar | Public | Fetch all crop calendar entries |

### Admin APIs (/api/admin) - ADMIN Role Only

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/admin/users | List all platform users |
| PATCH | /api/admin/users/{id}/role | Change a user role |
| PATCH | /api/admin/users/{id}/suspend | Suspend or Unsuspend a user |
| GET | /api/admin/marketplace/listings | Get all listings with status filter |
| PATCH | /api/admin/marketplace/listings/{id}/status | Approve or Reject a listing |
| GET | /api/admin/marketplace/disputes | Get all disputes |
| PATCH | /api/admin/marketplace/disputes/{id}/status | Resolve or Dismiss a dispute |

---

## Database Schema

### users Collection

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

### marketplace_listings Collection

```json
{
  "_id": "ObjectId",
  "title": "String",
  "category": "String (Crop | Equipment | Fertilizer | Vegetable | Fruit)",
  "price": "String",
  "farmerName": "String",
  "location": "String",
  "quantity": "String",
  "organicCertified": "Boolean",
  "status": "String (PENDING | APPROVED | REJECTED | SOLD)",
  "createdAt": "LocalDateTime"
}
```

### disputes Collection

```json
{
  "_id": "ObjectId",
  "buyerName": "String",
  "sellerName": "String",
  "reason": "String",
  "status": "String (OPEN | RESOLVED | DISMISSED)",
  "createdAt": "LocalDateTime"
}
```

### crop_calendars Collection

```json
{
  "_id": "ObjectId",
  "cropName": "String",
  "season": "String (KHARIF | RABI | SUMMER)",
  "sowingStart": "String",
  "sowingEnd": "String",
  "harvestStart": "String",
  "harvestEnd": "String",
  "status": "String (APPROVED | PENDING)"
}
```

---

## Prerequisites

Before running the application, ensure the following are installed:

- Java 21 JDK
- Maven 3.x
- A MongoDB Atlas account and cluster
- A Google Gemini API Key from aistudio.google.com

---

## Environment Variables

IMPORTANT: Never hardcode secrets. These must be set as environment variables at runtime.

| Variable | Description |
|---|---|
| MONGO_PASSWORD | Password for your MongoDB Atlas cluster |
| GEMINI_API_KEY | Your Google Gemini API Key |

These variables are injected into application.properties:

```properties
spring.data.mongodb.uri=mongodb+srv://agrinfo:${MONGO_PASSWORD}@cluster0.d7ie0fc.mongodb.net/agriverse1
gemini.api.key=${GEMINI_API_KEY:YOUR_API_KEY_HERE}
```

---

## Running the Application

### Step 1: Clone the Repository

```bash
git clone https://github.com/Puspaldas17/AgriVerseInfosys.git
cd FarmVerse-Precision-Agriculture-Management-Platform
```

### Step 2: Set Environment Variables

Windows PowerShell:
```powershell
$env:MONGO_PASSWORD="your_mongo_password"
$env:GEMINI_API_KEY="your_gemini_api_key"
```

Linux or macOS Terminal:
```bash
export MONGO_PASSWORD="your_mongo_password"
export GEMINI_API_KEY="your_gemini_api_key"
```

### Step 3: Build the Project

```bash
mvn clean compile
```

### Step 4: Run the Application

```bash
mvn spring-boot:run
```

### Step 5: Open in Browser

```
http://localhost:8082
```

### Default Admin Credentials

```
Email:    admin@agriverse.in
Password: admin123
```

---

## Frontend Pages

| URL | Page | Description |
|---|---|---|
| / | Landing Page | Public marketing page with features and how it works |
| /login.html | Farmer Login | Standard user login with JWT authentication |
| /signup.html | Registration | New farmer account registration |
| /dashboard.html | Farmer Dashboard | Main app: AI Chat, Pest Detector, Analytics, Missions |
| /marketplace.html | Marketplace | Browse and list agricultural products |
| /calendar.html | Crop Calendar | View seasonal sowing and harvest windows |
| /profile.html | Farmer Profile | Edit profile, soil type, language |
| /admin-login.html | Admin Login | Secure separate admin portal |
| /admin-dashboard.html | Admin Command Center | Full platform management dashboard |

---

## Security Model

The application implements a layered, defence-in-depth security strategy:

```
Request Received
      |
      v
CORS Filter          (Validates Origin header)
      |
      v
JWT Authentication   (Extracts and validates Bearer token)
Filter               (from Authorization header)
      |
      v
SecurityFilterChain  (Checks endpoint permissions)
                     - Public:    /api/auth/**, /api/marketplace/**
                     - ADMIN:     /api/admin/**
                     - Auth only: /api/user/**, /api/ai/**
      |
      v
Controller Layer     (Business logic executes)
+ Suspension Check   (checks if account is suspended)
```

Security Features:
- Passwords hashed with BCrypt (never stored in plaintext)
- Stateless sessions using JWT (no server-side session memory)
- Role-Based Access Control (ADMIN vs USER)
- Credential injection via Environment Variables (no hardcoded secrets)
- Account suspension system via Admin dashboard

---

## Future Enhancements

- Voice-to-Text AI: Multilingual voice advisory for non-literate farmers
- IoT Sensor Integration: Real-time soil moisture from hardware sensors
- Blockchain Marketplace: Immutable product certification and transaction ledger
- ML Yield Prediction: Python/TensorFlow microservice for harvest forecasting
- Mobile App (Android/iOS): Native mobile experience using the same backend APIs
- Live Weather API: Real-time OpenWeatherMap data integration for field alerts

---

## Team

- Project Guide: Ragul S
- Team: Team C — Infosys Springboard Virtual Internship 6.0
- Developer: Puspal Das

---

Built with love for Indian Farmers | 2026 FarmVerse. All Rights Reserved.
