import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

// Signup
export const signup = async (name, email, password) => {
  const res = await axios.post(`${API_BASE}/api/auth/signup`, { name, email, password });
  return res.data;
};

// Login
export const login = async (email, password) => {
  const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
  return res.data;
};
