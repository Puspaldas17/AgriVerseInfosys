# FarmVerse - Detailed Project Report
**Precision Agriculture Management Platform**

---

## 1. Project Overview
**FarmVerse** is a fully functional, Java Full Stack platform designed to modernize agricultural management. It bridges the gap between traditional farming and modern software by providing a centralized hub for AI advisory, crop planning, pest detection, and direct market trading. 

This report details the **exact features, modules, and workflows** that have been successfully developed and integrated into the current state of the application.

---

## 2. Implemented Modules & Features

### 2.1. Secure Authentication & Role Management
*(Managed by `AuthController.java`)*
* **JWT-Based Security:** The platform uses JSON Web Tokens (JWT) for stateless, encrypted sessions.
* **Role-Based Workflows:** Distinct login portals and dashboards for **Farmers** (`login.html`) and **Administrators** (`admin-login.html`).
* **Registration:** Secure user signup process mapping users to their specific roles and saving them into MongoDB.

### 2.2. The Farmer Dashboard (`dashboard.html`)
The core interface for farmers, serving as a unified control center.
* **Gamification Engine (`UserController.java`):** Implements an Experience Point (XP) and Leveling system. Farmers are assigned daily missions (e.g., "Check weather", "Log crop status") to drive daily app engagement.
* **Smart AI Assistant (`AIController.java`):** A real-time chat interface connected to Google's **Gemini 3.6 Flash** model. It answers complex agricultural queries, with built-in retry logic to handle server load (503 errors).
* **Advisory History:** Securely logs all AI interactions to the database, allowing farmers to review past advice.
* **Pest Detection Module (`PestController.java`):** A dedicated interface allowing farmers to identify crop diseases and pests.

### 2.3. Crop Sowing Calendar (`calendar.html`)
*(Managed by `CropCalendarController.java`)*
* **Visual Planning:** A dedicated calendar UI that allows farmers to visually plan out their crop cycles.
* **Task Management:** Full Create, Read, Update, and Delete (CRUD) operations for agricultural events, sowing dates, and harvest timelines.

### 2.4. Digital Farmer's Marketplace (`marketplace.html`)
*(Managed by `MarketplaceController.java`)*
* **Direct Selling:** Eliminates middlemen by allowing farmers to list their agricultural products directly on the platform.
* **Product Management:** Farmers can create product listings with prices, descriptions, and available quantities.
* **Secure Commerce:** Buyers can view and interact with these listings in a dedicated marketplace interface.

### 2.5. Admin Command Center (`admin-dashboard.html`)
A highly privileged portal for platform administrators to monitor and control the ecosystem.
* **User Analytics & Management (`AdminController.java`):** Allows admins to view total registered users, track platform usage statistics, and manage user accounts.
* **Marketplace Moderation (`AdminMarketplaceController.java`):** Provides oversight over the marketplace. Admins can review listings, handle disputes, and remove fraudulent or inappropriate products to ensure a safe trading environment.

### 2.6. Public Landing Page (`index.html`)
* **Interactive Front:** A modern, responsive landing page explaining the platform's benefits.
* **Contact Management (`ContactRequestController.java`):** Allows public users to submit inquiries, which are routed to the backend database for admin review.

---

## 3. Technology Stack (Actual Implementation)

* **Frontend:** HTML5, CSS3, Vanilla JavaScript. (No heavy frontend frameworks, ensuring maximum performance and low load times).
* **Backend:** Java 21, Spring Boot 3.x, Spring Web, Spring Security.
* **Database:** MongoDB Atlas (Cloud NoSQL) managed via Spring Data MongoDB.
* **AI Integration:** Google Gemini REST API accessed via Spring `RestTemplate`.
* **Build Tool:** Maven.

---

## 4. End-to-End User Workflow

1. **Onboarding:** A user lands on `index.html`, navigates to `signup.html`, and registers as a Farmer.
2. **Authentication:** The user logs in via `login.html`. The backend validates the credentials against MongoDB, generates a secure JWT, and redirects the user to `dashboard.html`.
3. **Daily Usage:** The farmer checks their daily missions on the dashboard. They open the **AI Assistant** to ask a question about fertilizer. The backend routes this to the Gemini API, logs the conversation, and returns the answer. The farmer earns XP for this action.
4. **Planning:** The farmer navigates to `calendar.html` to schedule their upcoming wheat harvest.
5. **Selling:** Once harvested, the farmer goes to `marketplace.html` and creates a listing for their wheat.
6. **Moderation:** An administrator logs into `admin-login.html`, navigates to the `admin-dashboard.html`, reviews the new marketplace listing via the Moderation tab, and monitors the overall platform health.

---

## 5. Conclusion
The FarmVerse project successfully delivers on its promise of a unified agricultural platform. By combining a gamified interface with real-time AI and direct marketplace trading, it provides a functional, secure, and highly modern solution to the problems faced by traditional farmers.
