import { Link, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import "./Dashboard.css";

export default function Dashboard() {
  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser") ||
      sessionStorage.getItem("loggedInUser") ||
      "null"
  );

  // Redirect to Login if no user is logged in
  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  // Find the current user's registered account
  const registeredUsers = JSON.parse(
    localStorage.getItem("registeredUsers") || "[]"
  );

  const currentUser = registeredUsers.find(
    (user) => user.email === loggedInUser.email
  );

  const userName = currentUser?.name || loggedInUser.name || "User";

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <h1>Welcome back, {userName}!</h1>
            <p>Here is your account overview.</p>
          </div>

          <div className="user-avatar">
            {userName.charAt(0).toUpperCase()}
          </div>
        </header>

        <section className="dashboard-cards">
          <Card title="Account Status" value="Active" icon="✅" />

          <Card title="User Profile" value={userName} icon="👤" />

          <Card title="Account Security" value="Protected" icon="🛡️" />
        </section>

        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <p className="section-description">
            Manage your account information and security.
          </p>

          <div className="action-cards">
            <Link to="/profile" className="action-card">
              <span className="action-icon">👥</span>
              <h3>View Profile</h3>
              <p>View your personal information.</p>
              <span className="action-link">View Profile</span>
            </Link>

            <Link to="/edit-profile" className="action-card">
              <span className="action-icon">✎</span>
              <h3>Edit Profile</h3>
              <p>Update your account details.</p>
              <span className="action-link">Edit details</span>
            </Link>

            <Link to="/change-password" className="action-card">
              <span className="action-icon">🔄</span>
              <h3>Change Password</h3>
              <p>Keep your account credentials updated.</p>
              <span className="action-link">Update Password</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
} 