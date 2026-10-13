# CareerSuit AI

# 🚀 CareerSuit AI

**An AI-powered career optimization platform for resume analysis, ATS matching, and job-specific resume tailoring.**

![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?logo=vite&logoColor=white)
![Java](https://img.shields.io/badge/Java-Backend-ED8B00?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-Backend-6DB33F?logo=springboot&logoColor=white)
![Python](https://img.shields.io/badge/Python-AI%20Service-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-AI%20Service-009688?logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)
![Google Gemini API](https://img.shields.io/badge/Google-Gemini%20API-4285F4?logo=googlegemini&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Language-F7DF1E?logo=javascript&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-5A29E4?logo=axios&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-API%20Testing-FF6C37?logo=postman&logoColor=white)
![Thunder Client](https://img.shields.io/badge/Thunder%20Client-API%20Testing-7B61FF?logo=thunderclient&logoColor=white)
![Swagger UI](https://img.shields.io/badge/Swagger-API%20Documentation-85EA2D?logo=swagger&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-Frontend%20Deployment-000000?logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-Backend%20Deployment-46E3B7?logo=render&logoColor=black)

## 🚀 Features

- **User Authentication:** User registration and login.
- **Resume Analysis:** Upload resumes and receive AI-powered feedback and an ATS-style score.
- **Job Match:** Compare resumes with job requirements and identify matching keywords.
- **Resume Tailoring:** Generate job-specific, tailored resumes with downloadable DOCX files.
- **Bullet Rewriter:** Improve resume bullet points using AI.
- **Resume Management:** View and manage previously uploaded resumes.
- **AI Integration:** Uses Google Gemini API for AI-powered resume and career assistance.

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| Frontend | React, Vite, JavaScript, CSS |
| Backend | Java, Spring Boot |
| AI Service | Python, FastAPI |
| Database | PostgreSQL |
| AI Model | Google Gemini API |
| API Communication | Axios, REST APIs |
| API Testing | Postman, Thunder Client, Swagger UI |
| Frontend Deployment | Vercel |
| Backend & AI Deployment | Render |

## 🏗️ Architecture

```text
React Frontend (Vercel)
        |
        | REST API Requests
        |
        +----------------------+
        |                      |
        v                      v
Spring Boot Backend       FastAPI AI Service
(Render)                  (Render)
        |                      |
        v                      v
PostgreSQL Database       Google Gemini API
```

## ⚙️ Installation & Setup

### Prerequisites

- Node.js and npm
- Java 21 or compatible Java version
- Python 3.10+
- PostgreSQL
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/rakshanda33/-CareerSuit-AI.git
cd -CareerSuit-AI
```

### 2. Start the Spring Boot Backend

Navigate to the backend directory containing `mvnw.cmd` and run:

```bash
mvnw.cmd spring-boot:run
```

The backend runs locally on `http://localhost:8080`.

Configure the PostgreSQL connection and required environment variables in the backend configuration before starting the service.

### 3. Start the FastAPI AI Service

Navigate to the AI service directory containing `api/main.py` and install its dependencies:

```bash
pip install -r requirements.txt
```

Configure your Google Gemini API key using the environment variable or configuration expected by the application, then start the service:

```bash
uvicorn api.main:app --reload --port 8000
```

The AI service runs locally on `http://localhost:8000`.

API documentation is available at:

`http://localhost:8000/docs`

### 4. Start the React Frontend

Navigate to the frontend directory and install dependencies:

```bash
npm install
npm run dev
```

The frontend runs locally at `http://localhost:5173`.

## 🌐 Live Deployment

| Service | URL |
|---|---|
| Frontend | Add your deployed Vercel URL |
| Spring Boot Backend | https://careersuit-backend-sc54.onrender.com |
| FastAPI AI Service | https://careersuit-ai.onrender.com |
| AI Service Health Check | https://careersuit-ai.onrender.com/health |

## 🧪 Testing

The main application workflows have been tested:

- User registration and login
- Resume upload and analysis
- Job matching with scores and keyword results
- Resume tailoring and DOCX download

API endpoints were tested using **Postman**, **Thunder Client**, and FastAPI's **Swagger UI** (`/docs`).

## 🔮 Future Improvements

- Strengthen backend authentication and authorization.
- Add automated tests for frontend and backend workflows.
- Improve error handling and validation.
- Enhance resume analysis and job-matching capabilities.
- Add more AI-powered career preparation tools.

## 👩‍💻 Author

**Rakshanda Noor**

- GitHub: [rakshanda33](https://github.com/rakshanda33)
- LinkedIn: [Rakshanda Noor](https://www.linkedin.com/in/rakshanda-noor-9aaa24291/)

---

*Built as a final-year B.Tech Computer Science & Engineering project.*
