import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

// ─────────────────────────────────────────────
// Authentication
// ─────────────────────────────────────────────

export const loginUser = (email, password) =>
  API.post("/login", {
    email,
    password,
  });

export const registerUser = (name, email, password) =>
  API.post("/register", {
    name,
    email,
    password,
  });


// ─────────────────────────────────────────────
// Resume Analysis
// ─────────────────────────────────────────────

export const uploadResume = (formData) =>
  API.post("/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


// ─────────────────────────────────────────────
// Job Description Match
// ─────────────────────────────────────────────

export const jobMatch = (formData) =>
  API.post("/job-match", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


// ─────────────────────────────────────────────
// Bullet Point Rewriter
// ─────────────────────────────────────────────

export const rewriteBullet = (bullet) =>
  API.post("/rewrite-bullet", {
    bullet,
  });


// ─────────────────────────────────────────────
// Resume Tailor
// ─────────────────────────────────────────────

export const tailorResume = (formData) =>
  API.post("/resume-tailor", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


// ─────────────────────────────────────────────
// Download Tailored Resume as Editable DOCX
// ─────────────────────────────────────────────

export const downloadTailoredResume = (result) =>
  API.post("/resume-tailor/download", result, {
    responseType: "blob",
  });