// Signup.jsx
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth"; // <-- import your helper

export default function Signup() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { name, email, password } = Object.fromEntries(formData);

    try {
      await signup(name, email, password); // <-- use helper instead of axios directly
      setMessage("✅ Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(`❌ ${error.response?.data?.error || "Signup failed"}`);
    }
  };

  return (
    <AuthForm
      title="Sign Up"
      onSubmit={handleSignup}
      fields={[
        { name: "name", label: "Name", type: "text", placeholder: "Enter your name" },
        { name: "email", label: "Email", type: "email", placeholder: "Enter your email" },
        { name: "password", label: "Password", type: "password", placeholder: "Create a password" },
      ]}
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </>
      }
      message={message}
    />
  );
}
