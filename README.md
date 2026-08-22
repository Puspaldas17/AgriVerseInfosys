# 🌱 AgriVerse (FarmVerse) - Precision Agriculture Management Platform

AgriVerse is a comprehensive, AI-powered platform designed to empower farmers with modern technology, precision agriculture insights, and a seamless marketplace. The platform bridges the gap between traditional farming and modern e-commerce, offering real-time data, crop advisories, and robust administrative oversight.

## 🚀 Key Features

### 👨‍🌾 For Farmers (User Portal)
- **AI Crop Advisory 24x7:** Get instant, AI-driven advice on crop health, soil management, and best farming practices.
- **Disease Detection via Photo:** Upload a photo of a sick plant and let the system diagnose the disease and suggest treatments.
- **Real-time Weather Forecasting:** Hyper-local weather data to help plan irrigation and harvesting.
- **Live Market Price Tracker:** Stay updated on real-time market rates for various crops to maximize profits.
- **Voice Support in 3 Languages:** Accessible voice interfaces for farmers who prefer speaking over typing, supporting multiple local languages.
- **Crop Calendar:** Plan out planting, fertilizing, and harvesting schedules.
- **Marketplace Access:** Buy and sell crops, farming equipment, and fertilizers directly with other users.

### 🛡️ For Administrators (Command Center)
- **High-Tech Dashboard:** A futuristic, dark-themed command center to oversee the entire platform ecosystem.
- **User Management & Role Control:** View all registered users, assign specialized roles (e.g., `ADMIN`, `VET`, `USER`), or ban problematic accounts.
- **Marketplace Moderation:** Review newly submitted marketplace listings and approve or reject them to prevent fraud.
- **Dispute Resolution:** Step in and mediate conflicts between buyers and sellers on the marketplace (Resolve / Dismiss).
- **Platform Telemetry & Analytics:** Monitor live metrics, total user counts, active sessions, and system health.
- **Live Activity Feed:** A real-time stream of platform events (new registrations, security alerts, AI queries).

## 🛠️ Technology Stack

**Backend**
- **Java 21 & Spring Boot 3:** Robust, scalable, and high-performance backend framework.
- **Spring Security & JWT:** Stateless, token-based authentication and role-based access control (RBAC).
- **MongoDB:** NoSQL database for flexible, fast document storage (hosted on MongoDB Atlas).
- **Maven:** Dependency and build management.

**Frontend**
- **Vanilla HTML5, CSS3, JavaScript:** Lightweight, lightning-fast frontend with zero heavy frameworks.
- **Neumorphism & Glassmorphism UI:** Modern, highly aesthetic design systems tailored for both the light-mode user app and the dark-mode admin portal.
- **FontAwesome:** Scalable vector icons.

## ⚙️ How to Run Locally

### Prerequisites
- Java Development Kit (JDK) 21+
- Maven
- A MongoDB cluster URI and Password

### Setup Instructions
1. Clone the repository.
2. Open a terminal in the project root.
3. Set your MongoDB password as an environment variable and run the Spring Boot application:
   ```powershell
   $env:MONGO_PASSWORD="your_mongo_password"; mvn spring-boot:run
   ```
4. **Access the application:**
   - **Farmer Portal:** `http://localhost:8082` (or `http://localhost:8082/login.html`)
   - **Admin Portal:** `http://localhost:8082/admin-login.html`

### Default Admin Credentials
When the application starts for the first time, it automatically seeds a default admin account if one does not exist:
- **Email:** `admin@agriverse.in`
- **Password:** `admin123`

## 🔒 Security Architecture
- All sensitive API endpoints are protected under `/api/...` and require a valid `Authorization: Bearer <token>` header.
- The Admin dashboard and its backend endpoints (`/api/admin/**`) strictly require the `ADMIN` role.
- Passwords are encrypted using `BCryptPasswordEncoder` before being stored in MongoDB.
- Cross-Origin Resource Sharing (CORS) is configured to allow safe communication between local development clients and the backend.
