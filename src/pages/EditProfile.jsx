import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Input from "../components/Input";
import Button from "../components/Button";
import Toast from "../components/Toast";
import "./EditProfile.css";

export default function EditProfile() {
  const navigate = useNavigate();

  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});

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

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const normalizedEmail = email.trim().toLowerCase();

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!normalizedEmail) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      newErrors.email = "Enter a valid email address";
    }

    // Check whether another account already uses this email
    const duplicateEmail = registeredUsers.some(
      (user) =>
        user.email.toLowerCase() === normalizedEmail &&
        user.email !== currentUser?.email
    );

    if (duplicateEmail) {
      newErrors.email = "This email is already registered to another account";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setToast({
        message: "Please correct the errors in the form.",
        type: "error",
      });
      return;
    }

    if (!currentUser) {
      setToast({
        message: "Account not found. Please log in again.",
        type: "error",
      });
      return;
    }

    const updatedUser = {
      ...currentUser,
      name: name.trim(),
      email: normalizedEmail,
    };

    const updatedUsers = registeredUsers.map((user) =>
      user.email === currentUser.email ? updatedUser : user
    );

    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    const updatedSession = {
      ...loggedInUser,
      name: updatedUser.name,
      email: updatedUser.email,
    };

    if (localStorage.getItem("loggedInUser")) {
      localStorage.setItem("loggedInUser", JSON.stringify(updatedSession));
    } else {
      sessionStorage.setItem("loggedInUser", JSON.stringify(updatedSession));
    }

    setErrors({});
    setToast({
      message: "Profile updated successfully!",
      type: "success",
    });
  };

  return (
    <div className="edit-profile-layout">
      <Sidebar />

      <main className="edit-profile-content">
        <header className="edit-profile-header">
          <div>
            <h1>Edit Profile</h1>
            <p>Update your personal information.</p>
          </div>
        </header>

        <section className="edit-profile-card">
          <div className="edit-profile-avatar">
            {name.trim().charAt(0).toUpperCase() || "U"}
          </div>

          <h2>Personal Information</h2>
          <p className="edit-profile-description">
            Keep your account details up to date.
          </p>

          <form className="edit-profile-form" onSubmit={handleSubmit}>
            <Input
              id="edit-name"
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              error={errors.name}
              autoComplete="name"
            />

            <Input
              id="edit-email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              error={errors.email}
              autoComplete="email"
            />

            <div className="edit-profile-actions">
              <Button text="Save Changes" type="submit" />

              <button
                type="button"
                className="edit-profile-cancel"
                onClick={() => navigate("/profile")}
              >
                Cancel
              </button>
            </div>
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