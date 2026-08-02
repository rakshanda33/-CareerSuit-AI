# System Architecture

CareerSuit AI follows a **modular microservice architecture**, where each layer is responsible for a specific part of the application. This separation improves scalability, maintainability, and code reusability.

## Architecture Diagram

```text
                           CareerSuit AI

                   ┌────────────────────────┐
                   │    React Frontend      │
                   │  (User Interface)      │
                   └───────────┬────────────┘
                               │ REST API
                               ▼
                 ┌─────────────────────────────┐
                 │    Spring Boot Backend      │
                 │-----------------------------│
                 │ • Authentication (JWT)      │
                 │ • User Management           │
                 │ • Resume Management         │
                 │ • Resume History            │
                 │ • Business Logic            │
                 └───────────┬─────────────────┘
                             │ HTTP
                             ▼
                 ┌─────────────────────────────┐
                 │    FastAPI AI Service       │
                 │-----------------------------│
                 │ • Resume Analysis           │
                 │ • ATS Matching              │
                 │ • Resume Tailoring          │
                 │ • Cover Letter Generation   │
                 │ • Bullet Point Rewriter     │
                 └───────────┬─────────────────┘
                             │
                             ▼
                      Google Gemini API


          Spring Boot Backend
                   │
                   ▼
            PostgreSQL Database
```

---

## Responsibilities

### React Frontend

Responsible for building the user interface, handling navigation, collecting user input, and displaying AI-generated results.

### Spring Boot Backend

Acts as the central controller of the application. It manages user authentication using JWT, handles business logic, communicates with the database, and forwards AI requests to the FastAPI service.

### FastAPI AI Service

Handles all AI-related operations, including resume analysis, ATS matching, resume tailoring, cover letter generation, and bullet point rewriting. It communicates directly with the Gemini API and returns structured responses to the Spring Boot backend.

### Google Gemini API

Processes prompts received from the FastAPI AI Service and generates AI-powered responses.

### PostgreSQL Database

Stores user accounts, uploaded resumes, analysis history, cover letters, and other application data.

---

## Request Flow

```text
User
   │
   ▼
React Frontend
   │
   ▼
Spring Boot Backend
   │
   ▼
FastAPI AI Service
   │
   ▼
Google Gemini API
   │
   ▼
FastAPI AI Service
   │
   ▼
Spring Boot Backend
   │
   ├── Store Analysis → PostgreSQL
   ▼
React Frontend
   │
   ▼
User
```

---

## Why This Architecture?

CareerSuit AI follows the **Single Responsibility Principle (SRP)**, where each component has a dedicated responsibility.

- **React Frontend** is responsible for the presentation layer and user experience.
- **Spring Boot Backend** manages authentication, business logic, and communication between services.
- **FastAPI AI Service** handles all AI processing and interactions with the Gemini API.
- **PostgreSQL** is responsible for storing application and user data.

This architecture is modular, scalable, and easy to maintain. It also allows each service to evolve independently, making it easier to add new AI features or expand the platform in the future.