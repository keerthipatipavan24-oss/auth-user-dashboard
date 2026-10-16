
import "./Header.css";

export default function Header({ title }) {
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
  const initial = userName.trim().charAt(0).toUpperCase() || "U";

  return (
    <header className="app-header">
      <div className="header-page-title">
        <h1>{title}</h1>
      </div>

      <div className="header-right">
        <div className="header-search">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search"
          />
        </div>

        <div className="header-avatar" title={userName}>
          {initial}
        </div>
      </div>
    </header>
  );
}
