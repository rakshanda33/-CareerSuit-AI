# API Design

The application exposes REST APIs through Spring Boot, which communicates with the FastAPI AI Service.

## Authentication

POST /auth/register

POST /auth/login

POST /auth/logout

---

## Resume

POST /resume/upload

GET /resume/history

DELETE /resume/{id}

---

## AI Services

POST /api/analyze

POST /api/ats

POST /api/rewrite

POST /api/tailor

POST /api/cover-letter

---

## User

GET /profile

PUT /profile

PUT /change-password