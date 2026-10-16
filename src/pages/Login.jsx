import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Toast from "../components/Toast";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const logoutMessage = sessionStorage.getItem("logoutToast");
    const expiredMessage = sessionStorage.getItem("sessionExpiredToast");
    const message = expiredMessage || logoutMessage;

    if (message) {
      setToast({
        message,
        type: "success",
      });

      sessionStorage.removeItem("logoutToast");
      sessionStorage.removeItem("sessionExpiredToast");
    }
  }, []);

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

    if (!normalizedEmail) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Get all registered accounts
    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );

    if (registeredUsers.length === 0) {
      setErrors({
        email: "No registered accounts found. Please register first.",
      });
      return;
    }

    // Find the account matching both email and password
    const savedUser = registeredUsers.find(
      (user) =>
        user.email.toLowerCase() === normalizedEmail &&
        user.password === password
    );

    if (!savedUser) {
      setErrors({
        email: "Invalid email or password",
      });
      return;
    }

    setErrors({});

    const session = {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
    };

    if (rememberMe) {
      localStorage.setItem("loggedInUser", JSON.stringify(session));
      sessionStorage.removeItem("loggedInUser");
    } else {
      sessionStorage.setItem("loggedInUser", JSON.stringify(session));
      localStorage.removeItem("loggedInUser");
    }

    setLoading(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <>
      {loading ? (
        <div className="login-loading-page">
          <div className="login-loading-content">
            <div className="login-spinner"></div>
            <h2>Logging you in...</h2>
            <p>Please wait while we prepare your dashboard.</p>
          </div>
        </div>
      ) : (
        <div className="login-page">
          <div className="login-container">
            <div className="login-header">
              <h1>Welcome Back</h1>
              <p>Login to your account</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <Input
                id="login-email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                error={errors.email}
                autoComplete="username"
              />

              <div className="form-group">
                <label htmlFor="password">Password</label>

                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {errors.password && (
                  <p className="error-message">{errors.password}</p>
                )}
              </div>

              <div className="login-options">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember">Remember me</label>
                </div>

                <Link to="/forgot-password">Forgot password?</Link>
              </div>

              <Button text="Login" type="submit" disabled={loading} />

              <p className="register-link">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </form>
          </div>
        </div>
      )}
 
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
} 