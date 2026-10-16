
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import "./Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedMobile = mobile.trim();

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!normalizedMobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(normalizedMobile)) {
      newErrors.mobile = "Enter a valid 10-digit Indian mobile number";
    }

    if (!normalizedEmail) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      newErrors.email = "Enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );

    const emailExists = registeredUsers.some(
      (user) => user.email.toLowerCase() === normalizedEmail
    );

    if (emailExists) {
      setErrors({
        email: "An account with this email already exists. Please log in.",
      });
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      mobile: normalizedMobile,
      email: normalizedEmail,
      password,
    };

    registeredUsers.push(newUser);

    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(registeredUsers)
    );

    localStorage.removeItem("registeredUser");

    navigate("/login");
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Register to get started</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-fields">
            <Input
              id="name"
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              error={errors.name}
              autoComplete="name"
            />

            <Input
              id="register-mobile"
              label="Mobile Number"
              type="tel"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                setErrors((prev) => ({ ...prev, mobile: "" }));
              }}
              placeholder="Enter your 10-digit mobile number"
              error={errors.mobile}
              autoComplete="tel"
            />

            <Input
              id="register-email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              error={errors.email}
              autoComplete="email"
            />

            <Input
              id="register-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              error={errors.password}
              autoComplete="new-password"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              }
            />

            <Input
              id="confirm-password"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
              autoComplete="new-password"
            />
          </div>

          <div className="register-actions">
            <Button text="Create Account" type="submit" />

            <p className="login-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
 