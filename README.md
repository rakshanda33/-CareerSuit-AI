# 🚀 CareerSuit AI

**An AI-powered career optimization platform for resume analysis, ATS matching, and job-specific resume tailoring.**

![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react\&logoColor=black)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-Backend-6DB33F?logo=springboot\&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-AI%20Service-009688?logo=fastapi)
![Gemini](https://img.shields.io/badge/Google-Gemini%20API-4285F4)

## 📌 Overview

CareerSuit AI helps job seekers analyze their resumes, evaluate their alignment with job descriptions, and generate tailored resumes using Generative AI. It combines a React frontend, Spring Boot backend, FastAPI AI service, Oracle Database, and Google Gemini API.

## ✨ Features

* **Resume Analysis:** AI-generated feedback, resume quality scoring, strengths, weaknesses, and improvement suggestions.
* **ATS Matching:** Resume-to-job-description matching, keyword identification, and potential skill gaps.
* **Resume Tailoring:** Generate job-specific resumes from an existing resume and target job description, with DOCX download.
* **Bullet-Point Rewriting:** Improve the clarity and presentation of resume bullet points.
* **Authentication:** User registration, login, and JWT-based authentication.
* **Resume Management:** Store and manage resume-related data.

## 🛠️ Tech Stack

| Component      | Technologies                       |
| -------------- | ---------------------------------- |
| Frontend       | React.js, Vite, JavaScript         |
| Backend        | Java, Spring Boot, Spring Security |
| AI Service     | Python, FastAPI                    |
| AI Integration | Google Gemini API                  |
| Database       | Oracle Database                    |
| Authentication | JWT                                |
| API Testing    | Thunder Client, Swagger UI         |

## 🏗️ Architecture

```text
React + Vite
     │
     ▼
Spring Boot ───────► Oracle Database
     │
     ▼
FastAPI AI Service
     │
     ▼
Google Gemini API
```

## ⚙️ Getting Started

**Prerequisites:** Node.js, Java, Python, Oracle Database, and a Google Gemini API key.

1. Clone the repository:

   ```bash
   git clone https://github.com/rakshanda33/-CareerSuit-AI.git
   cd -CareerSuit-AI
   ```

2. Configure your database credentials and Gemini API key using the environment variables or configuration expected by your application.

3. Start the Spring Boot backend from the directory containing `pom.xml`:

   ```bash
   mvnw.cmd spring-boot:run
   ```

4. Start the FastAPI service from the directory containing `api/main.py`:

   ```bash
   uvicorn api.main:app --reload --port 8000
   ```

5. Start the React frontend from the directory containing `package.json`:

   ```bash
   npm install
   npm run dev
   ```

*Note: Verify the directory paths, configuration, and environment variable names against your repository before running these commands.*

## 👩‍💻 Author

**Rakshanda Noor**
B.Tech Computer Science & Engineering, Jamia Hamdard

[GitHub](https://github.com/rakshanda33) · [LinkedIn](https://linkedin.com/in/rakshanda-noor-9aaa24291/)
