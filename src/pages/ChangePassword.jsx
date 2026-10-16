import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Input from "../components/Input";
import Button from "../components/Button";
import Toast from "../components/Toast";
import "./ChangePassword.css";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser") ||
      sessionStorage.getItem("loggedInUser") ||
      "null"
  );

  const registeredUsers = JSON.parse(
    localStorage.getItem("registeredUsers") || "[]"
  );

  const currentUser = registeredUsers.find(
    (user) => user.email === loggedInUser?.email
  );

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    } else if (!currentUser) {
      newErrors.currentPassword = "Account not found. Please log in again.";
    } else if (currentPassword !== currentUser.password) {
      newErrors.currentPassword = "Current password is incorrect";
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (
      currentUser &&
      currentPassword &&
      currentPassword === newPassword
    ) {
      newErrors.newPassword =
        "New password must be different from your current password";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      setToast({
        message: Object.values(newErrors)[0],
        type: "error",
      });

      return;
    }

    const updatedUsers = registeredUsers.map((user) =>
      user.email === currentUser.email
        ? { ...user, password: newPassword }
        : user
    );

    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});

    setToast({
      message: "Password changed successfully!",
      type: "success",
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
    <div className="change-password-layout">
      <Sidebar />

      <main className="change-password-content">
        <header className="change-password-header">
          <h1>Change Password</h1>
          <p>Update your password to keep your account secure.</p>
        </header>

        <section className="change-password-card">
          <div className="change-password-icon">🔒</div>
          <h2>Update Your Password</h2>

          <p className="change-password-description">
            Enter your current password and choose a new password.
          </p>

          <form className="change-password-form" onSubmit={handleSubmit}>
            <Input
              id="current-password"
              label="Current Password"
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your current password"
              error={errors.currentPassword}
              autoComplete="current-password"
              rightElement={toggleButton(showCurrent, () =>
                setShowCurrent(!showCurrent)
              )}
            />

            <Input
              id="new-password"
              label="New Password"
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              error={errors.newPassword}
              autoComplete="new-password"
              rightElement={toggleButton(showNew, () =>
                setShowNew(!showNew)
              )}
            />

            <Input
              id="confirm-password"
              label="Confirm New Password"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              error={errors.confirmPassword}
              autoComplete="new-password"
              rightElement={toggleButton(showConfirm, () =>
                setShowConfirm(!showConfirm)
              )}
            />

            <Button text="Update Password" type="submit" />
          </form>
        </section>
      </main>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
} 