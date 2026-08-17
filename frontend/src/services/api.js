import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

// Authentication
export const loginUser = (email, password) =>
  API.post("/login", { email, password });

export const registerUser = (name, email, password) =>
  API.post("/register", { name, email, password });

// Resume Upload & Analysis
export const uploadResume = (formData) =>
  API.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
// Job Description Match
export const jobMatch = (formData) =>
  API.post("/ats-match", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });