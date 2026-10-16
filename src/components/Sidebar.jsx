import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("loggedInUser");

    sessionStorage.setItem(
      "logoutToast",
      "You have logged out successfully!"
    );

    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">UserHub</h2>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link">
          <span className="sidebar-icon">🏠︎</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/profile" className="sidebar-link">
          <span className="sidebar-icon">👤</span>
          <span>User Profile</span>
        </NavLink>

        <NavLink to="/edit-profile" className="sidebar-link">
          <span className="sidebar-icon">✎</span>
          <span>Edit Profile</span>
        </NavLink>

        <NavLink to="/change-password" className="sidebar-link">
          <span className="sidebar-icon">🔒</span>
          <span>Change Password</span>
        </NavLink>
      </nav>

      <button
        type="button"
        className="sidebar-logout"
        onClick={() => setShowLogoutModal(true)}
      >
        <span className="sidebar-icon">➜]</span>
        <span>Logout</span>
      </button>

      {showLogoutModal && (
        <Modal
          title="Confirm Logout"
          message="Are you sure you want to log out of your account?"
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </aside>
  );
} 