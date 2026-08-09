# 🌾 FarmVerse — Precision Agriculture Management Platform

<div align="center">

**Empowering India's 140 Million Farmers with AI, Gamification & Real-Time Intelligence**

_A full-stack, multilingual, offline-capable smart farming platform_

---

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)](https://github.com/Puspaldas17/FarmVerse-Precision-Agriculture-Management-Platform)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Stack](https://img.shields.io/badge/stack-React%20%2B%20Spring%20Boot%20%2B%20MongoDB-informational?style=flat-square)](README.md)
[![Java](https://img.shields.io/badge/Java-21%20LTS-orange?style=flat-square)](https://openjdk.org/projects/jdk/21/)
[![PWA](https://img.shields.io/badge/PWA-enabled-purple?style=flat-square)](https://web.dev/pwa/)
[![Languages](https://img.shields.io/badge/languages-EN%20%7C%20HI%20%7C%20OR-orange?style=flat-square)](frontend/src/i18n.ts)
[![MongoDB](https://img.shields.io/badge/database-MongoDB%20Atlas-green?style=flat-square)](https://www.mongodb.com/atlas)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.x-brightgreen?style=flat-square)](https://spring.io/projects/spring-boot)
[![Infosys](https://img.shields.io/badge/Infosys-Training%20Project-blue?style=flat-square)](https://github.com/Puspaldas17)

</div>

---

## 📖 Table of Contents

1. [Executive Summary](#-executive-summary)
2. [Problem Statement](#-problem-statement)
3. [Key Features](#-key-features)
4. [Platform Architecture](#-platform-architecture)
5. [Technology Stack](#-technology-stack)
6. [Prerequisites](#-prerequisites)
7. [Project Structure](#-project-structure)
8. [Installation & Setup](#-installation--setup)
9. [Environment Configuration](#-environment-configuration)
10. [Running the Project Locally](#-running-the-project-locally)
11. [API Endpoints](#-api-endpoints)
12. [Pages & Routes](#-pages--routes)
13. [Feature Documentation](#-feature-documentation)
14. [Data Models](#-data-models-mongodb-collections)
15. [Deployment](#-deployment)
16. [What Differentiates FarmVerse](#-what-differentiates-farmverse)
17. [Future Roadmap](#-future-roadmap)
18. [Troubleshooting](#-troubleshooting)
19. [Author](#-author)
20. [License](#-license)

---

## 🌟 Executive Summary

FarmVerse is a comprehensive, AI-powered digital farming ecosystem designed for India's small and marginal farmers. It unifies crop advisory, real-time market intelligence, AI-driven pest detection, gamified learning, veterinary consultations with appointment scheduling, antimicrobial usage tracking, IoT sensor telemetry, drone imagery analysis, government scheme discovery, supply-chain blockchain, and PDF farm report generation — all in one platform accessible in three languages, installable offline, and usable without high digital literacy.

> Built on **React 18 + Spring Boot 3 + MongoDB Atlas** — a robust, enterprise-grade full-stack architecture ideal for scalable production deployment and aligned with Infosys Java full-stack training standards.

The platform is **fully deployed** with **MongoDB Atlas** as the cloud database, making it production-ready and publicly accessible.

---

## ❗ Problem Statement

India's agricultural sector accounts for **18% of GDP** and employs **44% of the workforce**, yet the farmer remains chronically underserved by technology.

| Challenge                          | Scale                                                    |
| ---------------------------------- | -------------------------------------------------------- |
| Lack of personalized crop advisory | 140M+ small & marginal farmers have no agronomist access |
| Market price opacity               | Middlemen capture 30–40% of farm-gate value              |
| Late pest & disease detection      | Annual crop losses estimated at ₹80,000+ crore           |
| Digital accessibility barriers     | Low literacy + inconsistent internet in rural areas      |
| No veterinary access               | Livestock healthcare gap in rural India                  |
| Fragmented tooling                 | No single platform integrates weather, soil, market & AI |

**FarmVerse solves all six — in one unified, accessible application.**

---

## ✨ Key Features

| Feature                    | Description                                           |
| -------------------------- | ----------------------------------------------------- |
| 🤖 **AI Crop Advisory**    | Personalized fertilizer, irrigation & sowing plans    |
| 🐛 **Pest Detection**      | Upload leaf photo → CNN diagnoses disease instantly   |
| 📊 **Analytics Dashboard** | 4-tab interactive charts (yield, soil, weather, crop) |
| 🩺 **Vet Consultations**   | Book appointments & get advisories from veterinarians |
| 🏪 **F2C Marketplace**     | Sell produce directly to consumers, no middlemen      |
| 🎮 **Gamification**        | XP, levels, streaks, badges & daily missions          |
| 🌧️ **Weather & Market**    | Live IMD weather + Mandi market price feeds           |
| 📅 **Crop Calendar**       | 10-crop sowing & harvest planner by month             |
| 🔗 **Blockchain Ledger**   | Tamper-evident AMU drug log with hash-chain           |
| 🛸 **Drone Analysis**      | Multi-zone aerial NDVI + field health analysis        |
| 📄 **PDF Reports**         | One-click A4 farm report download (jsPDF)             |
| 🌐 **Multilingual**        | English · हिंदी · ଓଡ଼ିଆ (~1200 translation keys)      |
| 📶 **Offline PWA**         | Installable, works without internet                   |

---

## 🏗️ Platform Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    React 18 Frontend (Vite)                          │
│                                                                      │
│  ┌────────────┐  ┌────────────┐  ┌────────┐  ┌──────────────────┐   │
│  │  Dashboard │  │ Vet Portal │  │ Admin  │  │ Tools & Insights  │   │
│  │  (7 Tabs)  │  │            │  │ Portal │  │   (5 Tabs)        │   │
│  └─────┬──────┘  └─────┬──────┘  └───┬────┘  └────────┬─────────┘   │
│        │               │             │                │              │
│  ┌─────▼───────────────▼─────────────▼────────────────▼───────────┐  │
│  │      Zustand Store  (XP · Level · Streak · Missions · Badges)  │  │
│  └──────────────────────────┬──────────────────────────────────── ┘  │
└──────────────────────────── ┼──────────────────────────────────────  ┘
                              │  REST API + Spring Security + JWT
┌─────────────────────────────▼───────────────────────────────────────┐
│              Spring Boot 3.3.x / Java 21 Backend                     │
│  /api/auth · /api/farmers · /api/appointments                        │
│  /api/vet  · /api/admin   · /api/advisory · /api/analytics           │
│  /api/amu  · /api/market  · /api/chat     · /api/predict             │
│  /api/listings (Marketplace CRUD)                                    │
└─────────────────┬──────────────────────────────┬────────────────────┘
                  │                              │
   ┌──────────────▼──────────┐    ┌─────────────▼───────────────┐
   │   MongoDB Atlas          │    │  Python AI Microservice      │
   │  (Spring Data MongoDB)   │    │  FastAPI + TensorFlow/CNN    │
   └─────────────────────────┘    └─────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Core Stack

| Layer                    | Technology                          | Version       | Purpose                                         |
| ------------------------ | ----------------------------------- | ------------- | ----------------------------------------------- |
| **Frontend Framework**   | React                               | 18.x          | Core UI with component architecture             |
| **Build Tool**           | Vite                                | 5.x           | Fast HMR development & production builds        |
| **Frontend Language**    | TypeScript                          | 5.x           | Full type safety across the UI                  |
| **Styling**              | TailwindCSS + CSS Custom Properties | 3.x           | Design system, glassmorphism, dark mode         |
| **UI Components**        | Radix UI + shadcn/ui                | Latest        | Accessible, headless components (50+)           |
| **Data Visualization**   | Recharts                            | 2.x           | Analytics charts (Line, Bar, Area, Radar)       |
| **Client Routing**       | React Router                        | v6            | SPA page navigation                             |
| **State Management**     | Zustand                             | Latest        | Global state: auth, gamification, XP, streaks   |
| **HTTP Client**          | Axios                               | 1.x           | API calls with automatic JWT interceptors       |
| **Server State**         | TanStack Query (React Query)        | v5            | Caching, background refetch, mutations          |
| **Form Management**      | React Hook Form + Zod               | Latest        | Validated farmer & listing forms                |
| **Animations**           | Framer Motion                       | 11.x          | XP bar, leaderboard podium, badge reveals       |
| **Internationalization** | react-i18next                       | Latest        | EN / Hindi / Odia (~1200 translation keys)      |
| **PDF Generation**       | jsPDF + html2canvas                 | Latest        | Formatted A4 farm report download               |
| **PWA**                  | vite-plugin-pwa + Workbox           | Latest        | Offline caching + installability                |
| **Icons**                | Lucide React                        | Latest        | Consistent iconography                          |
| **Notifications**        | Sonner                              | Latest        | Non-blocking toast notifications                |
| **Backend Framework**    | Spring Boot                         | 3.3.x         | Java full-stack REST API server                 |
| **Backend Language**     | Java                                | 21 (LTS)      | Modern Java with virtual threads                |
| **Build Tool**           | Maven                               | 3.9+          | Dependency management & builds                  |
| **Database**             | MongoDB Atlas                       | 7.x           | Cloud-hosted NoSQL document database            |
| **ODM**                  | Spring Data MongoDB                 | 4.x           | Repository-pattern MongoDB access               |
| **Authentication**       | Spring Security + jjwt              | Latest        | JWT-based stateless role-based auth             |
| **Input Validation**     | Spring Validation (Jakarta)         | Latest        | `@NotNull`, `@Email`, `@Size` on request bodies |
| **Caching**              | Spring Cache + Caffeine             | Latest        | In-memory TTL cache for weather & market data   |
| **API Documentation**    | Springdoc OpenAPI (Swagger UI)      | 2.x           | Auto-generated API docs at `/swagger-ui`        |
| **Code Reduction**       | Lombok                              | Latest        | `@Data`, `@Builder` — zero boilerplate Java     |
| **Monitoring**           | Spring Actuator                     | Latest        | `/actuator/health` health checks                |
| **AI Service**           | Python + FastAPI                    | 3.11 + 0.100+ | ML model serving as microservice                |
| **Machine Learning**     | TensorFlow / PyTorch + CNN          | Latest        | Crop disease image classification               |
| **Containerization**     | Docker + Docker Compose             | Latest        | Unified multi-service local development         |
| **Hosting (Frontend)**   | Vercel                              | —             | Global CDN for React static files               |
| **Hosting (Backend)**    | Railway.app                         | —             | Spring Boot JAR cloud deployment                |
| **CI/CD**                | GitHub Actions                      | —             | Auto-build & deploy on push to `main`           |

---

## ✅ Prerequisites

| Tool                | Version                 | Purpose                              |
| ------------------- | ----------------------- | ------------------------------------ |
| Node.js             | v18+ (v20+ recommended) | React frontend                       |
| npm                 | Latest                  | Frontend package manager             |
| Java JDK            | 21 (LTS)                | Spring Boot backend                  |
| Maven               | 3.9+                    | Backend build & dependency manager   |
| Python              | v3.11+                  | AI microservice                      |
| MongoDB Atlas       | —                       | Cloud database (free tier available) |
| Docker _(optional)_ | Latest                  | Containerized local development      |

---

## 📁 Project Structure

```
FarmVerse-Precision-Agriculture-Management-Platform/
│
├── src/
│   ├── main/
│   │   ├── java/com/agriverse1/agriverse1/
│   │   │   ├── config/              # Security and MongoDB configuration
│   │   │   ├── controller/          # REST API Controllers
│   │   │   ├── dto/                 # Data Transfer Objects
│   │   │   ├── entity/              # MongoDB Data Models
│   │   │   ├── exception/           # Global Exception Handlers
│   │   │   ├── repository/          # Spring Data MongoDB Repositories
│   │   │   ├── security/            # JWT Utils & Filters
│   │   │   ├── service/             # Business Logic Layer
│   │   │   └── Agriverse1Application.java # Spring Boot entry point
│   │   │
│   │   └── resources/
│   │       ├── application.properties # App configs and MongoDB URIs
│   │       └── static/              # Frontend web assets
│   │           ├── css/             # Stylesheets (style.css, dashboard.css)
│   │           ├── js/              # JavaScript logic (script.js, dashboard.js)
│   │           ├── images/          # Image assets
│   │           ├── index.html       # Landing Page
│   │           ├── login.html       # Login UI
│   │           ├── signup.html      # Registration UI
│   │           └── dashboard.html   # Main Dashboard UI
│
├── scripts/
│   └── api-tests/                   # JSON payloads, PowerShell & Batch API tests
│
└── pom.xml                          # Maven build configuration
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Puspaldas17/FarmVerse-Precision-Agriculture-Management-Platform.git
cd FarmVerse-Precision-Agriculture-Management-Platform
```

### 2. Set Secure Environment Variables

For security, the MongoDB password is not hardcoded. Set it in your environment:
```powershell
$env:MONGO_PASSWORD="your_atlas_password"
```

### 3. Run the Application

The project is built as a single cohesive Spring Boot application. All frontend and backend assets are served together.

```bash
mvn clean spring-boot:run
```

The application will now be running at `http://localhost:8082`.

> **Windows Note:** If you encounter Pillow errors, run: `pip install --upgrade pillow`

---

## 🔧 Environment Configuration

### Frontend — `frontend/.env`

```bash
cp frontend/.env.example frontend/.env
```

| Variable               | Description             | Default                 |
| ---------------------- | ----------------------- | ----------------------- |
| `VITE_API_BASE_URL`    | Spring Boot backend URL | `http://localhost:8080` |
| `VITE_AI_SERVICE_URL`  | Python AI service URL   | `http://localhost:8000` |
| `VITE_OPENWEATHER_KEY` | OpenWeatherMap API key  | Optional                |

### Backend — `backend/src/main/resources/application.properties`

| Property                     | Description                       | Required                                |
| ---------------------------- | --------------------------------- | --------------------------------------- |
| `spring.data.mongodb.uri`    | MongoDB Atlas connection string   | **Required**                            |
| `jwt.secret`                 | Secret key for signing JWT tokens | **Required**                            |
| `server.port`                | Spring Boot server port           | `8080`                                  |
| `ai.service.url`             | Python AI service URL             | `http://localhost:8000`                 |
| `spring.cache.caffeine.spec` | Cache TTL config                  | `maximumSize=500,expireAfterWrite=300s` |

---

## 🚀 Running the Project Locally

You need **three terminals** running simultaneously:

**Terminal 1 — React Frontend**

```bash
cd frontend
npm run dev
```

🟢 App: **http://localhost:5173**

**Terminal 2 — Spring Boot Backend**

```bash
cd backend
mvn spring-boot:run
```

🟢 API: **http://localhost:8080**  
📄 Swagger UI: **http://localhost:8080/swagger-ui/index.html**

**Terminal 3 — Python AI Service**

```bash
cd ai_service
python main.py
```

🟢 AI Service: **http://localhost:8000**

### 🐳 Optional: Docker Compose (All Services at Once)

```bash
docker-compose up --build
```

| Service         | URL                                         |
| --------------- | ------------------------------------------- |
| React Frontend  | http://localhost:5173                       |
| Spring Boot API | http://localhost:8080                       |
| Python AI       | http://localhost:8000                       |
| Swagger UI      | http://localhost:8080/swagger-ui/index.html |

---

## Quick Verification

1. Open **http://localhost:5173** (or the live demo URL)
2. Register or Login as a **Farmer** (Guest Mode also available — no sign-up needed)
3. Use the 🌐 button to switch language (EN / हिंदी / ଓଡ଼ିଆ)
4. Go to **Dashboard → Vet Inbox** to book an appointment or request a consultation
5. Go to **Dashboard → Pest Detector** to test the AI disease detection
6. Go to **Dashboard → Analytics** to see interactive charts
7. Go to **Tools & Insights** (`/tools`) to explore IoT, Drone, Blockchain, Schemes & PDF Export

Login as **Vet** (`/vet`) or **Admin** (`/admin`) using seeded credentials to access their dedicated portals.

> Seed default users: `POST http://localhost:8080/api/admin/seed`

---

## 🔌 API Endpoints

| Group        | Endpoint Prefix     | Auth Required      | Description                           |
| ------------ | ------------------- | ------------------ | ------------------------------------- |
| Auth         | `/api/auth/*`       | No                 | Register, login, guest login (JWT)    |
| Farmers      | `/api/farmers/*`    | JWT                | CRUD, consultations, vet advisories   |
| Appointments | `/api/appointments` | JWT                | Book, list, update appointments       |
| Vet          | `/api/vet/*`        | JWT + `VET` role   | Consultations, advisory management    |
| Admin        | `/api/admin/*`      | JWT + `ADMIN` role | User mgmt, broadcasts, overview KPIs  |
| Advisory     | `/api/advisories`   | JWT                | Crop advisory generation              |
| Analytics    | `/api/analytics/*`  | JWT                | Crop trends, soil health, weather     |
| AMU          | `/api/amu/*`        | JWT                | Drug log, withdrawal tracking, ledger |
| Market       | `/api/market`       | No                 | Mandi market prices                   |
| Weather      | `/api/weather`      | No                 | Weather data                          |
| Chatbot      | `/api/chat`         | JWT                | AI chatbot proxy                      |
| Pest AI      | `/api/predict`      | No                 | Image-based pest/disease prediction   |
| Profile      | `/api/profile/*`    | JWT                | Advisory history, subscription        |
| Listings     | `/api/listings`     | JWT (write)        | Marketplace listings CRUD             |

> Full interactive API documentation: **`http://localhost:8080/swagger-ui/index.html`**

---

## 🗺️ Pages & Routes

| Route          | Component            | Access        | Description                            |
| -------------- | -------------------- | ------------- | -------------------------------------- |
| `/`            | `Index.tsx`          | Public        | Landing page with featured tools       |
| `/login`       | `Login.tsx`          | Public        | Registration and JWT authentication    |
| `/dashboard`   | `Dashboard.tsx`      | Farmer        | Core farmer dashboard (7 tabs)         |
| `/tools`       | `ToolsPage.tsx`      | Farmer        | Tools & Insights (IoT/Drone/Chain/PDF) |
| `/vet`         | `VetDashboard.tsx`   | Vet           | Vet consultation & advisory management |
| `/admin`       | `AdminDashboard.tsx` | Admin         | Platform admin panel                   |
| `/amu`         | `AMUManager.tsx`     | Vet / Admin   | AMU blockchain ledger                  |
| `/leaderboard` | `Leaderboard.tsx`    | Authenticated | Community XP rankings with podium      |
| `/marketplace` | `Marketplace.tsx`    | Authenticated | Farmer-to-Consumer produce exchange    |
| `/calendar`    | `CropCalendar.tsx`   | Authenticated | Seasonal sowing & harvest planner      |
| `/profile`     | `Profile.tsx`        | Authenticated | Farmer profile with gamification stats |

---

## 📚 Feature Documentation

### Feature 1 — Gamification Engine

> Drives measurable behaviour change by converting best practices into rewarding daily habits.

**Daily Mission System**

- 8 missions assigned each day covering all platform features
- Each mission awards 40–100 XP upon completion
- All missions auto-reset at midnight using date comparison

**XP & Leveling**

- XP persists across sessions; animated XP progress bar on Profile page (Framer Motion)
- Higher levels unlock badge eligibility thresholds
- Managed via **Zustand** store with `localStorage` persistence

**Daily Login Streak Tracking**

- Compares today's login date to last recorded login — increments or resets accordingly
- Streak displayed prominently on Dashboard and Profile

**Badge System (10+ Badges)**

- Unlockable: Green Thumb, Market Guru, Streak Master, Early Bird, Crop Hero, Pest Buster, Weather Watcher, Community Star, and more
- Locked badges shown with greyed overlay and lock icon

**Full Leaderboard Page (`/leaderboard`)**

- Animated Gold 🥇 / Silver 🥈 / Bronze 🥉 podium for top 3 farmers
- Filter tabs: **Weekly · Monthly · All-Time**

---

### Feature 2 — JWT Authentication & Role-Based Access

> Stateless, secure authentication with role enforcement at every API endpoint.

- **Login / Register** returns a signed JWT containing `{ id, role, name }`
- JWT stored in `localStorage`; **Axios interceptor** attaches `Authorization: Bearer <token>` to every API call automatically
- **`JwtAuthFilter`** (Spring Security `OncePerRequestFilter`) decodes and validates JWT on all protected routes
- **`@PreAuthorize("hasRole('VET')")`** / `@PreAuthorize("hasRole('ADMIN')")` enforces role access at the method level
- Guest mode bypasses JWT; guest users cannot access vet inbox or advisory history
- Clear `401 Unauthorized` and `403 Forbidden` responses for invalid/missing tokens

---

### Feature 3 — AI & Smart Advisory

> Personalized agronomic intelligence, delivered in seconds.

**Crop Advisory Engine**

- Tailored recommendations for fertilizer, irrigation, and crop variety based on soil type, land area, and season

**AI Chatbot Assistant**

- Multilingual conversational Q&A with Web Speech API voice input

**Pest & Disease Image Detection**

- Upload crop leaf photo → Python AI service (FastAPI + CNN) → disease name, confidence %, and treatment recommendation

**Predictive Pest Alert Widget (14-Day Forecast)**

- Calculates outbreak likelihood for Rice, Wheat, Tomato, Maize using month, weather patterns, and historical data
- Shows 14-day bar chart with risk levels, trend arrow, confidence %, and "Take Action" button
- 🔴 High / 🟡 Medium / 🟢 Low — pulsing red indicator on High risk

**Advisory History Tab**

- All AI-generated advisories persisted in MongoDB Atlas and displayed chronologically

---

### Feature 4 — Analytics Dashboard (4 Tabs)

> Deep farm intelligence through interactive, always-populated data visualizations.

All charts use intelligently generated 30-day mock data as fallback when the backend has no records.

| Tab                  | Contents                                                           |
| -------------------- | ------------------------------------------------------------------ |
| **Overview**         | 4 KPI cards, grouped bar chart, radar chart                        |
| **Crop Performance** | Progress bars per crop, 30-day trend line chart                    |
| **Soil Health**      | Dual-area chart (moisture + nitrogen), pH line chart               |
| **Weather**          | 3 stat cards, multi-axis temperature/humidity chart, rainfall bars |

---

### Feature 5 — Veterinary Consultation System

> Bridging the gap between rural farmers and veterinary professionals.

**Farmer — Vet Inbox Tab (Dashboard)**

- Submit consultation requests (Animal ID, disease, message)
- Track status: `Pending` / `Approved` / `Rejected` with vet reply note
- View all vet advisories addressed to them (targeted or broadcast)
- **Book appointments** directly from the Vet Inbox tab

**Vet Dashboard (`/vet`)**

| Capability          | Description                                     |
| ------------------- | ----------------------------------------------- |
| Patient List        | All registered farmers                          |
| Consultation Queue  | All requests — approve, reject, reply, re-open  |
| Appointment Manager | View / confirm / reschedule appointments        |
| Broadcast Advisory  | Send advisory to all farmers or specific farmer |
| Advisory History    | All advisories sent, with date and target       |

**Appointment API**

| Method  | Endpoint                 | Description                                 |
| ------- | ------------------------ | ------------------------------------------- |
| `GET`   | `/api/appointments`      | List appointments (filtered by role)        |
| `POST`  | `/api/appointments`      | Farmer books a new appointment              |
| `PATCH` | `/api/appointments/{id}` | Vet updates status, note, or scheduled time |

---

### Feature 6 — Tools & Insights Page (`/tools`)

> Five advanced farming tools unified in one tab-based page.

#### Tab 1 — IoT Sensor Dashboard

- Live mock telemetry: soil moisture, temperature, pH, nitrogen
- Status indicators (🟢 Optimal / 🟡 Warning / 🔴 Alert) with target ranges
- Auto-refreshes every 30 seconds; irrigation alert when moisture is out of range

#### Tab 2 — Drone Aerial Analysis

- Drag-and-drop aerial image upload
- Simulated CNN analysis (2.2 s delay) across 4 field zones
- Per-zone results: NDVI score, uniformity %, waterlogging risk, dry patch %, recommendation

#### Tab 3 — Produce Blockchain Ledger

- Register harvests: crop, quantity, harvest date, pesticides used
- Each entry gets a unique simulated 40-char hex transaction hash
- Randomly assigned certifier (AgriVerify DAO / FarmLedger Network / GreenTrace Protocol)
- Expandable block cards with copy-to-clipboard hash

#### Tab 4 — Government Scheme Finder

- 7 major schemes: PM-KISAN, PMFBY, KCC, eNAM, ATMA, RKVY, NFSM
- Search + category filter (subsidy / insurance / credit / market / welfare)
- Land-size eligibility check using farmer's profile data
- Expandable cards with official government portal links

#### Tab 5 — PDF Farm Report Export

- Check/uncheck sections to include: Profile, Advisory, Pest, IoT, AMU, Blockchain
- **jsPDF + html2canvas** renders a hidden A4-formatted HTML report at 2× resolution
- Automatically sliced into A4 pages and downloaded as a real `.pdf` file
- Named: `FarmVerse_FarmReport_<FarmerName>_<Year>.pdf`

---

### Feature 7 — F2C Community Marketplace (`/marketplace`)

> Eliminating middlemen through direct Farmer-to-Consumer commerce.

- Produce listings with search, category filter (Grain / Vegetable / Fruit), and organic badge
- Contact Seller reveals phone + one-click WhatsApp deeplink
- Post new listings via inline form — persisted to MongoDB Atlas
- UPI deeplink integration for payment initiation

---

### Feature 8 — Crop Sowing Calendar (`/calendar`)

> Seasonal planner with agronomic data for 10 major Indian crops.

- 12-month strip selector defaulting to the current month
- **SOW NOW 🌱 / HARVEST ✅** badges per crop per month
- 12-segment horizontal timeline bar (green = sowing, orange = harvest)
- Water requirement filter: Low · Medium · High

---

### Feature 9 — Notification Center

- 🔔 Bell icon with unread red badge counter
- 7 pre-populated notifications across 5 categories: Pest / Market / Weather / Mission / System
- Category filter chips, Mark All Read, and individual dismiss buttons
- Server-Sent Events (SSE) ready architecture using Spring's `SseEmitter` for real-time push

---

### Feature 10 — Farmer Profile Page

- Farm details form: name, phone, soil type (6 Indian classifications), land size, language preference
- Right column gamification stats: XP progress bar, streak days, badges unlocked, missions today
- Full badge showcase grid with locked overlay

---

### Feature 11 — Subscription & Upgrade System

**Free vs Premium comparison (8 feature rows)**

- Upgrade CTA (₹199/month) opens comparison modal with animated confirm flow

---

### Feature 12 — Admin Portal (`/admin`)

| Capability            | Description                                                        |
| --------------------- | ------------------------------------------------------------------ |
| Overview KPIs         | Total farmers, active today, total advisories, total consultations |
| User Management       | View, edit, delete any farmer/vet/admin account                    |
| Create User           | Admin creates accounts for vets and other admins                   |
| Seed Default Users    | One-click to seed default admin + vet accounts in MongoDB          |
| Broadcast Message     | Send platform-wide notifications                                   |
| AMU Ledger View       | Admin view of full antimicrobial usage ledger                      |
| Consultation Overview | View all consultations across all vets and farmers                 |
| CSV Export            | Export farmer data and analytics summaries as CSV                  |

---

### Feature 13 — AMU Blockchain Ledger (`/amu`)

| Capability                 | Description                                                           |
| -------------------------- | --------------------------------------------------------------------- |
| Hash-Chain Architecture    | Each AMU entry SHA-hashed and chained to prior entry (tamper-evident) |
| Treatment Logging          | Antibiotic, dosage, animal ID, date, attending vet                    |
| Withdrawal Period Tracking | Days remaining until produce is safe for sale                         |
| Blockchain Viewer UI       | Visual ledger with hash values and chain links                        |

---

### Feature 14 — Multilingual Support & Accessibility

| Capability           | Detail                                                                    |
| -------------------- | ------------------------------------------------------------------------- |
| 3 UI Languages       | English · Hindi (हिंदी) · Odia (ଓଡ଼ିଆ)                                    |
| Translation Coverage | Navigation, tabs, missions, toasts, errors, advisory, vet portal, chatbot |
| Voice Input          | Web Speech API in Chatbot                                                 |
| Dark Mode            | Full dark theme via CSS custom properties                                 |
| PWA                  | Installable; offline caching via vite-plugin-pwa + Workbox                |

---

### Feature 15 — Weather & Market Data

**Weather Card** — 3-day forecast with temperature, humidity, wind speed, condition icon, and extreme event alerts

**Market Price Card** — Live Mandi rates (APMC) with delta indicators (🔺▼) for major crops

---

## 🗄️ Data Models (MongoDB Collections)

> All models are implemented as Spring Data MongoDB `@Document` classes with Lombok `@Data` and `@Builder` annotations. Collection names and field structures are identical to the original design.

| Model             | Key Fields                                                                          | Collection          |
| ----------------- | ----------------------------------------------------------------------------------- | ------------------- |
| `Farmer`          | name, email, password (BCrypt), phone, soilType, landSize, role, subscriptionStatus | `farmers`           |
| `Advisory`        | farmerId, crop, summary, fertilizer, irrigation, pest, weather                      | `advisories`        |
| `AdvisoryHistory` | farmerId, crop, advisory text, weatherData, soilData                                | `advisoryhistories` |
| `AnalyticsData`   | farmerId, crop, date, healthScore, yield, soil metrics, weather metrics             | `analyticsdatas`    |
| `DrugLog`         | animalId, drugName, dosage, withdrawalDays, applicator, treatmentDate               | `druglogs`          |
| `Block`           | index, timestamp, data, previousHash, hash (AMU blockchain)                         | `blocks`            |
| `Consultation`    | farmerId, vetId, animalId, disease, message, status, vetNote                        | `consultations`     |
| `VetAdvisory`     | vetId, farmerId (null=all), title, body, crop, targetRole                           | `vetadvisories`     |
| `Appointment`     | farmerId, vetId, animalId, reason, scheduledAt, status, vetNote                     | `appointments`      |
| `Listing`         | farmerId, cropName, quantity, price, category, organic, phone, location             | `listings`          |

All production data is stored in **MongoDB Atlas** (cloud, AWS Oregon). Collections are created automatically by Spring Data MongoDB on first write.

---

## 🚢 Deployment

| Component      | Platform      | URL / Details                   |
| -------------- | ------------- | ------------------------------- |
| **Frontend**   | Vercel        | Global CDN — React static files |
| **Backend**    | Railway.app   | Spring Boot JAR (Java 21)       |
| **Database**   | MongoDB Atlas | Cloud cluster (AWS)             |
| **AI Service** | Railway.app   | Python FastAPI container        |

### Frontend → Vercel

| Setting              | Value                                     |
| -------------------- | ----------------------------------------- |
| Framework            | Vite                                      |
| Build Command        | `npm run build`                           |
| Output Directory     | `dist`                                    |
| Environment Variable | `VITE_API_BASE_URL=<Railway backend URL>` |

### Backend → Railway.app

| Setting       | Value                                    |
| ------------- | ---------------------------------------- |
| Runtime       | Java 21                                  |
| Build Command | `mvn clean package -DskipTests`          |
| Start Command | `java -jar target/farmverse-backend.jar` |

**Environment Variables on Railway:**

| Key                       | Value                           |
| ------------------------- | ------------------------------- |
| `SPRING_DATA_MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET`              | Strong secret key (min 256-bit) |
| `AI_SERVICE_URL`          | Python AI service URL           |

### Database → MongoDB Atlas

All data is stored on **MongoDB Atlas** (cloud, free tier available). No migration needed — the same MongoDB collections and field names are reused directly.

---

## 🌟 What Differentiates FarmVerse

| Differentiator                         | Strategic Rationale                                                         |
| -------------------------------------- | --------------------------------------------------------------------------- |
| **Voice-First Interface**              | Removes literacy barrier; farmers speak, not type                           |
| **Gamification for Behaviour Change**  | Converts one-time curiosity into daily, sustained adoption                  |
| **14-Day Predictive Pest Forecast**    | Warns farmers ahead of outbreak season, not after detection                 |
| **Spring Security Role-Based Auth**    | Stateless JWT with vet/admin enforcement at the API level                   |
| **IoT + Drone + Blockchain Tools**     | 5 advanced features in one unified Tools & Insights page                    |
| **Offline-First PWA Architecture**     | Usable in areas with no or intermittent connectivity                        |
| **Unified Ecosystem**                  | Weather + Soil + AI + Market + Vet + Community in one app                   |
| **Verified Supply Chain Records**      | AMU blockchain provides trust for organic & compliant produce               |
| **Middleman-Free Marketplace**         | Farmers capture full value; consumers get fresher, cheaper produce          |
| **Vet-Farmer Direct Channel**          | Rural farmers get veterinary advice and appointments without travelling     |
| **Enterprise-Grade Java Backend**      | Spring Boot 3.x — production-ready, scalable, Infosys-standard architecture |
| **Cloud-Native Production Deployment** | Live on Vercel + Railway + MongoDB Atlas — not just a demo                  |

---

## 🔭 Future Roadmap

| Feature                     | Status      | Description                                                  |
| --------------------------- | ----------- | ------------------------------------------------------------ |
| 💳 UPI Payment Integration  | Partial     | UPI deeplinks integrated in Marketplace                      |
| 📲 SMS Fallback Channel     | Planned     | Critical alerts to feature phones via Twilio                 |
| 🔗 QR Code per Produce Lot  | Implemented | QR traceability for each blockchain-registered harvest       |
| 🧪 Real AI/ML Backend       | Implemented | Full Python CNN model integration for disease detection      |
| 🌐 Live Deployment          | ✅ Deployed | Vercel + Railway + MongoDB Atlas                             |
| ✅ Unit & Integration Tests | In Progress | JUnit 5 + Mockito (backend), Vitest (frontend)               |
| 📊 CSV Export               | Implemented | Admin dashboard CSV export for farmer data                   |
| 🔔 Real-Time Notifications  | Implemented | SSE-based push notification architecture (Spring SseEmitter) |
| 🌍 Vercel Frontend CDN      | Planned     | Separate Vercel deployment for faster global CDN             |
| 🤖 LLM-Powered Chatbot      | Planned     | Replace rule-based chatbot with Google Gemini API            |
| 🐳 Full Docker Support      | Planned     | Docker Compose for all 3 services with one command           |
| 📱 React Native App         | Planned     | Mobile app using the same Spring Boot API                    |

---

## 🐛 Troubleshooting

| Problem                   | Solution                                                                      |
| ------------------------- | ----------------------------------------------------------------------------- |
| Port 8080 already in use  | Change `server.port` in `application.properties`                              |
| AI Service not connecting | Ensure `python main.py` is running in `ai_service/` on port 8000              |
| Analytics shows no charts | Smart mock fallback data renders automatically                                |
| MongoDB connection error  | Verify `spring.data.mongodb.uri` is correctly set in `application.properties` |
| JWT auth errors           | Ensure `jwt.secret` is set and is a strong key (min 256-bit)                  |
| PWA icons missing         | Run `npm run build` once to generate PWA assets                               |
| CORS errors               | Verify `SecurityConfig.java` allows the frontend origin                       |
| Spring Boot won't start   | Run `mvn clean install` and ensure Java 21 is on `PATH`                       |
| 401 Unauthorized errors   | Ensure Axios interceptor is attaching `Authorization: Bearer <token>`         |
| Swagger UI not loading    | Visit `http://localhost:8080/swagger-ui/index.html`                           |
| "Failed to load" UI error | Verify Spring Boot `/api` routes return valid JSON                            |
| Railway cold start delay  | Free tier may have cold starts; check service logs                            |
| Render cold start delay   | Free tier sleeps after 15 min inactivity; first load = 30–60s                 |

---

## 👨‍💻 Author

|                 |                                                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**        | Puspal Das                                                                                                                                |
| **Institution** | SOA University (ITER), Bhubaneswar, Odisha                                                                                                |
| **Program**     | Infosys FarmVerse Precision Agriculture Management Platform Training                                                                      |
| **GitHub**      | [@Puspaldas17](https://github.com/Puspaldas17)                                                                                            |
| **Repository**  | [FarmVerse-Precision-Agriculture-Management-Platform](https://github.com/Puspaldas17/FarmVerse-Precision-Agriculture-Management-Platform) |
| **Live App**    | [agriverse-bwqw.onrender.com](https://agriverse-bwqw.onrender.com)                                                                        |

---

## 📄 License

MIT License — open source for the benefit of India's farming community.

See [LICENSE](LICENSE) for full terms.

---

<div align="center">

_Built with ❤️ for India's 140 million farmers_

**React 18 · Spring Boot 3 · MongoDB Atlas · Python FastAPI**

_Infosys FarmVerse Precision Agriculture Management Platform Training Program_

</div>
