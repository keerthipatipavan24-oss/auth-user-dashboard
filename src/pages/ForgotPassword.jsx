import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Enter a valid email address");
      return;
    }

    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );

    const registeredUser = registeredUsers.find(
      (user) => user.email.toLowerCase() === normalizedEmail
    );

    if (!registeredUser) {
      setError("No account found with this email address");
      return;
    }

    sessionStorage.setItem("passwordResetEmail", registeredUser.email);

    setSuccess("Email verified. You can now reset your password.");

    navigate("/reset-password");
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="forgot-password-icon">🔑</div>

        <div className="forgot-password-header">
          <h1>Forgot Password?</h1>
          <p>
            Enter your registered email address to continue resetting your
            password.
          </p>
        </div>

        {success && (
          <p className="forgot-password-success" role="status">
            {success}
          </p>
        )}

        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <Input
            id="forgot-email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
              setSuccess("");
            }}
            placeholder="Enter your registered email"
            error={error}
            autoComplete="off"
          />

          <Button text="Continue" type="submit" />
        </form>

        <p className="forgot-password-back">
          Remember your password? <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
} 