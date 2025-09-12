// Login.jsx
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth.js"; // 👈 import from api.js

export default function Login() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      // 👇 call helper instead of axios directly
      const response = await login(data.email, data.password);

      // ✅ Save JWT token (or user info) to localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      setMessage("✅ Login successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(`❌ ${error.response?.data?.error || "Login failed"}`);
    }
  };

  return (
    <AuthForm
      title="Login"
      onSubmit={handleLogin}
      fields={[
        { name: "email", label: "Email", type: "email", placeholder: "Enter your email" },
        { name: "password", label: "Password", type: "password", placeholder: "Enter your password" },
      ]}
      footer={
        <>
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </>
      }
      message={message}
    />
  );
}
