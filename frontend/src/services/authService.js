import axios from "axios";

const API = axios.create({
  baseURL: "https://careersuit-backend-sc54.onrender.com",
});

export const loginUser = (email, password) =>
  API.post("/login", { email, password });

export const registerUser = (name, email, password) =>
  API.post("/register", { name, email, password });
