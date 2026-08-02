# Software Requirements Specification (SRS)

# CareerSuit AI

**Version:** 1.0

**Project Type:** AI-Powered Career Development Platform

**Status:** Planning Phase

---

# 1. Introduction

## 1.1 Purpose

This Software Requirements Specification (SRS) defines the functional and non-functional requirements for CareerSuit AI. It serves as the foundation for the design, development, testing, and deployment of the application.

---

## 1.2 Project Overview

CareerSuit AI is an AI-powered career development platform that helps users improve their resumes, optimize ATS compatibility, tailor resumes for job descriptions, generate cover letters, and manage their career documents from a single dashboard.

---

## 1.3 Objectives

- Build a modern AI-powered career platform
- Improve resume quality using AI
- Help users pass ATS screening
- Generate personalized cover letters
- Maintain resume history
- Provide a scalable and modular architecture

---

# 2. Scope

CareerSuit AI provides AI-powered tools to assist job seekers throughout the application process.

### Included in Version 3

- User Authentication
- Resume Upload
- Resume Analysis
- ATS Score Checker
- Resume Tailoring
- Bullet Point Rewriter
- Cover Letter Generator
- Resume History
- Dashboard

---

# 3. Target Users

- College Students
- Fresh Graduates
- Working Professionals
- Job Seekers

---

# 4. Functional Requirements

### Authentication

- User Registration
- User Login
- JWT Authentication
- Secure Logout

### Resume Management

- Upload Resume
- View Uploaded Resume
- Resume History

### AI Features

- Resume Analysis
- ATS Matching
- Resume Tailoring
- Bullet Point Rewriter
- Cover Letter Generation

### Dashboard

- View Resume Scores
- View ATS Scores
- Access Resume History
- View AI Suggestions

---

# 5. Non-Functional Requirements

### Performance

- Fast API responses
- Efficient AI processing

### Security

- JWT Authentication
- Password Encryption
- Secure API Communication

### Scalability

- Modular Architecture
- Microservice-based Design

### Usability

- Responsive UI
- Simple Navigation
- User-Friendly Dashboard

---

# 6. Technology Stack

| Layer | Technology |
|------|------------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Spring Boot, Java 21 |
| AI Service | FastAPI, Python, Gemini API |
| Database | PostgreSQL |
| Security | Spring Security, JWT |
| Version Control | Git, GitHub |

---

# 7. System Architecture

```text
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

Spring Boot
        │
        ▼
PostgreSQL
```

---

# 8. Database Overview

Main Entities:

- User
- Resume
- Resume Analysis
- Cover Letter

Relationship:

User

↓

Resume

↓

Resume Analysis

↓

Cover Letter

---

# 9. Future Enhancements

- Job Matching
- Interview Preparation
- LinkedIn Review
- GitHub Analysis
- AI Career Coach
- Learning Roadmaps

---

# 10. Development Roadmap

### Phase 1

Planning & Documentation

### Phase 2

Frontend Development

### Phase 3

Backend Development

### Phase 4

AI Service Integration

### Phase 5

Database Integration

### Phase 6

Testing & Deployment

---

# 11. Conclusion

CareerSuit AI aims to become a scalable AI-powered career platform that simplifies the job application process through intelligent resume analysis, ATS optimization, and personalized career assistance. The system is designed with a modular architecture to support future enhancements and production deployment.