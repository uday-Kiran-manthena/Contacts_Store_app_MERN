import React from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { FaSignOutAlt, FaSun, FaMoon } from "react-icons/fa";

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="brand">Contact Store</div>
      <div className="header-right">
        <button onClick={toggleTheme} className="btn small">
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
        {user && (
          <div className="profile">
            <div className="avatar">{user.name?.charAt(0)}</div>
            <div className="username">{user.name}</div>
            <button onClick={logout} className="btn danger">
              <FaSignOutAlt style={{ marginRight: "6px" }} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
