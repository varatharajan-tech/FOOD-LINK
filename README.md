# Food-Donating-Web-Application-Platform
Our project,“Food Waste Management System,”connects restaurants, hotels,and households with NGOs and people in need. It redistributes surplus food instead of letting it go to waste. It uses cloud technology for real-time updates, tracking, and coordination to redistribute surplus food efficiently, reducing waste and helping fight hunger in society.

# This is our food donation website and application link (https://sharemealx.netlify.app/)

 <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f642db95-e9ec-49ad-87e5-b82fd9112118" />
       
# 🍽️ Food Waste Management System

The **Food Waste Management System** is a cloud-based platform that connects **restaurants, hotels, and households** with **NGOs and people in need**.  
It redistributes surplus food instead of letting it go to waste — promoting **social good**, **sustainability**, and **zero hunger**.

---

## 🚀 Features

- **Real-time Food Listing & Requesting:**    
  Donors can list surplus food instantly, and NGOs can submit meal requests in real time.

- **Multi-Stakeholder Integration:**  
  Seamlessly connects donors, NGOs, food trucks, and recipients for efficient coordination.

- **Cloud-Based Coordination:**  
  Scalable backend for automated scheduling, updates, and tracking via cloud technology.

- **Mobile & Web Access:**  
  Responsive UI built with React and React Native for accessibility across devices.

- **GPS-Based Route Optimization:**  
  Suggests efficient delivery routes for food trucks using Google Maps integration.

- **Food Safety Management:**  
  AI-driven quality checks, including temperature and expiry monitoring, ensure safe redistribution.

- **User Management:**  
  Secure registration system with defined roles and permissions for donors, NGOs, and admins.

---

## 🧩 Technology Stack

**Backend:** Laravel (PHP) Microservices  
**Frontend:** React (Web) & React Native (Mobile)  
**Cloud:** AWS / Azure (Kubernetes), Firebase Realtime Database  
**APIs:** Google Maps (Location), Twilio (Notifications)  
**AI & IoT:** Used for real-time food quality and safety monitoring  

---

## ⚙️ Installation & Setup

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/food-waste-management.git
cd backend

# Install dependencies
composer install

# Configure environment
cp .env.example .env
# Add database, cloud, and API keys to .env

# Run migrations
php artisan migrate --seed
 

Project Structure
│
├── backend/ # Backend API and services
│ ├── app/
│ │ ├── Controllers/ # Handles API requests and business logic
│ │ ├── Models/ # Eloquent models for database entities
│ │ ├── Services/ # Reusable service classes
│ │ ├── Middleware/ # Request filtering and authentication logic
│ │ └── ...
│ ├── config/ # Configuration files
│ ├── database/
│ │ ├── migrations/ # Database schema definitions
│ │ ├── seeders/ # Dummy data and initial setups
│ │ └── factories/ # Model factories for testing
│ ├── routes/
│ │ ├── api.php # API route definitions
│ │ └── web.php # Web route definitions
│ ├── tests/ # Unit and integration tests
│ ├── .env.example # Example environment configuration
│ ├── composer.json # PHP dependencies
│ └── README.md
│
├── frontend/ # Web frontend (React)
│ ├── public/ # Static assets and index.html
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page-level components
│ │ ├── services/ # API calls and utilities
│ │ ├── hooks/ # Custom React hooks
│ │ ├── styles/ # CSS or Tailwind styles
│ │ ├── App.jsx # Root component
│ │ └── index.js # Entry point
│ ├── .env.example
│ ├── package.json
│ └── README.md
│
├── mobile/ # Mobile frontend (React Native)
│ ├── android/ # Android platform files
│ ├── ios/ # iOS platform files
│ ├── src/
│ │ ├── components/ # Reusable mobile UI components
│ │ ├── screens/ # App screens
│ │ ├── services/ # API service calls
│ │ ├── utils/ # Helper utilities
│ │ ├── App.js # App entry component
│ │ └── index.js # Main entry point
│ ├── .env.example
│ ├── package.json
│ └── README.md
│
├── cloud-infra/ # Cloud infrastructure (IaC)
│ ├── k8s/ # Kubernetes deployment manifests
│ ├── terraform/ # Terraform infrastructure scripts
│ └── README.md
│
├── docs/ # Documentation and architecture diagrams
│ ├── architecture.md
│ ├── api-specification.md
│ └── user-stories.md
│
├── shared/ # Shared utilities and constants
│ ├── validators/
│ ├── constants/
│ └── helpers/
│
├── scripts/ # CI/CD and automation scripts
│
├── .gitignore
├── LICENSE
└── README.md

```


## 📘 Folder Explanations

This repository is organized into modular components for scalability, maintainability, and collaboration.

- **backend/** — Laravel-based backend API following the MVC structure. Handles authentication, data storage, routing, middleware, and business logic.
- **frontend/** — React-based web application for donors, NGOs, and admin users, providing dashboards and food management tools.
- **mobile/** — React Native mobile app for field users such as donors, NGOs, and food truck drivers, supporting real-time food listing and delivery tracking.
- **cloud-infra/** — Infrastructure as Code setup including Kubernetes manifests and Terraform scripts for automated cloud deployment and scaling.
- **docs/** — Project documentation including architecture diagrams, API specifications, and user stories for reference.
- **shared/** — Common code utilities, constants, and validation logic shared across the frontend and backend.
- **scripts/** — Development and deployment scripts used for automation, CI/CD pipelines, or environment setup.

