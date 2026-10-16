
import { Link, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./MyProfile.css";

export default function MyProfile() {
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

  const userName = currentUser?.name || loggedInUser?.name || "User";
  const userEmail = currentUser?.email || loggedInUser?.email || "";
  const userMobile = currentUser?.mobile || loggedInUser?.mobile || "";

  const hasProfile = Boolean(currentUser && userEmail);

  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="profile-layout">
      <Sidebar />

      <main className="profile-content">
        <header className="profile-header">
          <div>
            <h1>User Profile</h1>
            <p>View your personal information and account details.</p>
          </div>

          {hasProfile && (
            <Link to="/edit-profile" className="profile-edit-button">
              Edit Profile
            </Link>
          )}
        </header>

        {!hasProfile ? (
          <section className="profile-card profile-error-state">
            <h2>Profile information unavailable</h2>
            <p>
              We couldn't load your profile details. Please log in again
              to continue.
            </p>
            <Link to="/login" className="profile-edit-button">
              Go to Login
            </Link>
          </section>
        ) : (
          <section className="profile-card">
            <div className="profile-banner"></div>

            <div className="profile-details">
              <div className="profile-avatar">
                {userName.charAt(0).toUpperCase()}
              </div>

              <h2>{userName}</h2>
              <p className="profile-email">{userEmail}</p>
              <span className="profile-status">Active Account</span>
            </div>

            <div className="profile-information">
              <h3>Personal Information</h3>

              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <span>Full Name</span>
                  <p>{userName}</p>
                </div>

                <div className="profile-info-item">
                  <span>Email Address</span>
                  <p>{userEmail}</p>
                </div>

                <div className="profile-info-item">
                  <span>Mobile Number</span>
                  <p>{userMobile || "Not provided"}</p>
                </div>

                <div className="profile-info-item">
                  <span>Account Status</span>
                  <p>Active</p>
                </div>

                <div className="profile-info-item">
                  <span>Account Type</span>
                  <p>Standard User</p>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <Link to="/change-password" className="profile-action-link">
                Change Password
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
