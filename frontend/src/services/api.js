import axios from "axios";

// ─────────────────────────────────────────────
// Spring Boot Backend
// Port: 8080
// ─────────────────────────────────────────────

const BACKEND_API = axios.create({
  baseURL: "http://localhost:8080",
});


// ─────────────────────────────────────────────
// FastAPI AI Service
// Port: 8000
// ─────────────────────────────────────────────

const AI_API = axios.create({
  baseURL: "http://localhost:8000",
});


// ─────────────────────────────────────────────
// Authentication — Spring Boot
// ─────────────────────────────────────────────

export const loginUser = (email, password) =>
  BACKEND_API.post("/login", {
    email,
    password,
  });

export const registerUser = (name, email, password) =>
  BACKEND_API.post("/register", {
    name,
    email,
    password,
  });


// ─────────────────────────────────────────────
// Resume Analysis — FastAPI
// ─────────────────────────────────────────────

export const uploadResume = (formData) =>
  AI_API.post("/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


// ─────────────────────────────────────────────
// Job Description Match — FastAPI
// ─────────────────────────────────────────────

export const jobMatch = (formData) =>
  AI_API.post("/job-match", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


// ─────────────────────────────────────────────
// Bullet Point Rewriter — FastAPI
// ─────────────────────────────────────────────

export const rewriteBullet = (bullet) =>
  AI_API.post("/rewrite-bullet", {
    bullet,
  });


// ─────────────────────────────────────────────
// Resume Tailor — FastAPI
// ─────────────────────────────────────────────

export const tailorResume = (formData) =>
  AI_API.post("/resume-tailor", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


// ─────────────────────────────────────────────
// Download Tailored Resume — FastAPI
// ─────────────────────────────────────────────

export const downloadTailoredResume = (result) =>
  AI_API.post("/resume-tailor/download", result, {
    responseType: "blob",
  });


// ─────────────────────────────────────────────
// Resume Storage — Spring Boot
// ─────────────────────────────────────────────

export const saveResume = (formData) =>
  BACKEND_API.post("/api/resumes/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getUserResumes = (userId) =>
  BACKEND_API.get(`/api/resumes/user/${userId}`);

export const deleteResume = (resumeId) =>
  BACKEND_API.delete(`/api/resumes/${resumeId}`);

export const getResumeFile = (resumeId) =>
  BACKEND_API.get(`/api/resumes/${resumeId}/file`, {
    responseType: "blob",
  });