<div align="center">
  <img src="https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Java_21-007396?style=for-the-badge&logo=java&logoColor=white" alt="Java" />
  <img src="https://img.shields.io/badge/JWT_Security-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT Security" />
</div>

<br />

<div align="center">
  <h1>🌱 AgriVerse (FarmVerse)</h1>
  <p><strong>Precision Agriculture Management & E-Commerce Ecosystem</strong></p>
</div>

---

**AgriVerse** is an advanced, AI-powered agricultural platform designed to bridge the gap between traditional farming and modern precision agriculture. By offering real-time telemetry, AI crop advisories, and a fully integrated peer-to-peer marketplace, AgriVerse equips farmers with the digital infrastructure needed to maximize crop yield, reduce waste, and connect directly with markets.

## 📑 Table of Contents
- [Core Features](#-core-features)
  - [Farmer Ecosystem (Client Facing)](#farmer-ecosystem-client-facing)
  - [Command Center (Admin Facing)](#command-center-admin-facing)
- [System Architecture](#%EF%B8%8F-system-architecture)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Getting Started](#-getting-started)
- [Security & Authentication](#-security--authentication)

---

## 🚀 Core Features

### 👨‍🌾 Farmer Ecosystem (Client Facing)
The core application is built to be accessible, fast, and feature-rich for end-users (farmers).
* 🤖 **AI Crop Advisory 24/7:** Instant, intelligent recommendations on soil health, pest control, and watering schedules.
* 📸 **Disease Detection:** Upload crop photos to receive immediate AI diagnostics and treatment recommendations.
* 🌦️ **Real-Time Weather Integration:** Hyper-local weather forecasting for optimal planting and harvesting operations.
* 📈 **Live Market Prices:** Track real-time commodity rates across different markets to ensure fair pricing.
* 🗣️ **Multilingual Voice Support:** Native language accessibility allowing voice-driven commands (currently supporting 3 major languages).
* 🛒 **P2P Marketplace:** A dedicated marketplace for farmers to buy, sell, or lease crops, fertilizers, and heavy equipment.

### 🛡️ Command Center (Admin Facing)
A highly restricted, aesthetically distinct (dark-mode) portal for platform administrators and moderators.
* 👥 **User & Role Management:** Complete CRUD capabilities over the user base. Seamlessly promote users to `VET` (agricultural experts) or `ADMIN` roles.
* 🏪 **Marketplace Moderation:** Review newly created marketplace listings. Ensure platform integrity by approving legitimate listings or rejecting fraudulent ones.
* ⚖️ **Dispute Resolution Engine:** Act as a mediator for failed e-commerce transactions, overseeing and resolving buyer/seller conflicts.
* 📊 **Platform Telemetry:** Live dashboards displaying active sessions, total registered users, and marketplace health.
* ⚡ **Live Activity Stream:** Real-time log of critical platform events (auth failures, new registrations, database backups).

---

## 🏗️ System Architecture

AgriVerse employs a **stateless RESTful API** architecture, utilizing Spring Boot on the backend and native web technologies on the frontend. Data is persisted in a NoSQL MongoDB cluster, allowing for highly flexible schemas (ideal for diverse marketplace listings and user profiles).

* **Authentication Layer:** Spring Security intercepts incoming requests. Public assets (`/css`, `/js`) and auth routes (`/api/auth`) are permitted. Protected resources (`/api/admin`) require a valid JWT token validated by the `JwtAuthenticationFilter`.
* **Data Access Layer:** Utilizes `MongoRepository` interfaces for robust, boilerplate-free database operations.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Backend Framework** | Java 21, Spring Boot 3, Spring Web |
| **Security** | Spring Security, JWT (JSON Web Tokens), BCrypt |
| **Database** | MongoDB Atlas, Spring Data MongoDB |
| **Frontend** | HTML5, CSS3 (Neumorphism / Glassmorphism), Vanilla ES6 JS |
| **Build Tool** | Apache Maven |

---

## 🏁 Getting Started

Follow these instructions to run the AgriVerse ecosystem locally on your machine.

### 1. Prerequisites
- **Java 21** or higher installed.
- **Maven** installed and added to your system `PATH`.
- A valid **MongoDB** Cluster URI (or local instance).

### 2. Installation
Clone the repository to your local machine:
```bash
git clone https://github.com/Puspaldas17/AgriVerseInfosys.git
cd AgriVerseInfosys
```

### 3. Environment Variables
The application relies on an environment variable for database authentication. Set `MONGO_PASSWORD` in your terminal session before starting the application.

### 4. Running the Application
Use Maven to start the Spring Boot server:

**For Windows (PowerShell):**
```powershell
$env:MONGO_PASSWORD="your_actual_password_here"
mvn spring-boot:run
```

**For Mac/Linux:**
```bash
export MONGO_PASSWORD="your_actual_password_here"
mvn spring-boot:run
```

### 5. Accessing the Portals
Once the server reports `Started Agriverse1Application in X seconds`, open your browser:
* **Farmer Portal:** `http://localhost:8082`
* **Admin Portal:** `http://localhost:8082/admin-login.html`

> **Note:** The database seeder will automatically generate a default administrator account (`admin@agriverse.in` / `admin123`) and inject mock marketplace data upon the first boot.

---

## 🔒 Security & Authentication
AgriVerse takes platform security seriously:
- **Stateless Sessions:** The application does not rely on Tomcat HTTP sessions, completely mitigating CSRF attacks.
- **JWT Lifecycles:** Tokens contain embedded roles (`ROLE_USER`, `ROLE_ADMIN`) and are verified on every secure request.
- **Password Hashing:** All user credentials are irreversibly hashed using `BCryptPasswordEncoder` with an appropriate work factor before persistence.
- **CORS Policies:** Cross-Origin Resource Sharing is strictly defined to prevent unauthorized frontend clients from polling the API.

---
<div align="center">
  <i>Developed with ❤️ for the future of farming.</i>
</div>
