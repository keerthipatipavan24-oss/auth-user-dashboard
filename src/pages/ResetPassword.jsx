import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import "./ResetPassword.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const resetEmail = sessionStorage.getItem("passwordResetEmail");

  if (!resetEmail) {
    return <Navigate to="/forgot-password" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!password) {
      newErrors.password = "New password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );

    const currentUser = registeredUsers.find(
      (user) => user.email.toLowerCase() === resetEmail.toLowerCase()
    );

    if (!currentUser) {
      setErrors({
        email: "Unable to reset password. Please try again.",
      });
      return;
    }

    // Prevent resetting to the same password.
    if (password && password === currentUser.password) {
      newErrors.password =
        "New password must be different from your current password";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Update only the account requesting the password reset.
    const updatedUsers = registeredUsers.map((user) =>
      user.email.toLowerCase() === resetEmail.toLowerCase()
        ? { ...user, password: password }
        : user
    );

    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    sessionStorage.removeItem("passwordResetEmail");
    localStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("loggedInUser");

    setSuccess("Password reset successfully!");

    navigate("/login", {
      state: {
        message: "Password reset successfully. Please log in.",
      },
    });
  };

  const toggleButton = (visible, toggle) => (
    <button
      type="button"
      onClick={toggle}
      aria-label={visible ? "Hide password" : "Show password"}
    >
      {visible ? "Hide" : "Show"}
    </button>
  );

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <div className="reset-password-icon">🔐</div>

        <div className="reset-password-header">
          <h1>Reset Password</h1>
          <p>Create a new password for your account.</p>
        </div>

        {success && (
          <p className="reset-password-success" role="status">
            {success}
          </p>
        )}

        {errors.email && (
          <p className="reset-password-error" role="alert">
            {errors.email}
          </p>
        )}

        <form className="reset-password-form" onSubmit={handleSubmit}>
          <Input
            id="new-password"
            label="New Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({});
            }}
            placeholder="Enter new password"
            error={errors.password}
            autoComplete="new-password"
            rightElement={toggleButton(showPassword, () =>
              setShowPassword(!showPassword)
            )}
          />

          <Input
            id="confirm-new-password"
            label="Confirm New Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors({});
            }}
            placeholder="Confirm new password"
            error={errors.confirmPassword}
            autoComplete="new-password"
            rightElement={toggleButton(showConfirmPassword, () =>
              setShowConfirmPassword(!showConfirmPassword)
            )}
          />

          <Button text="Reset Password" type="submit" />
        </form>

        <p className="reset-password-back">
          Remember your password? <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
} 