
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoute() {
  const navigate = useNavigate();

  const isAuthenticated = Boolean(
    localStorage.getItem("loggedInUser") ||
      sessionStorage.getItem("loggedInUser")
  );

  useEffect(() => {
    if (!isAuthenticated) return;

    let inactivityTimer;

    const logoutUser = () => {
      localStorage.removeItem("loggedInUser");
      sessionStorage.removeItem("loggedInUser");

      sessionStorage.setItem(
        "sessionExpiredToast",
        "Your session expired. Please log in again."
      );

      navigate("/login", { replace: true });
    };

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(logoutUser, 15 * 60 * 1000);
    };

    const activityEvents = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);

      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
 