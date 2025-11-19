import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import Avatar from "./Avatar";

export default function Header() {
  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-text">DICODING FORUM APP</span>
        </Link>

        {/* Navigation */}
        <nav className="nav-links">
          <Link to="/" className="nav-item">
            Threads
          </Link>
          <Link to="/leaderboard" className="nav-item">
            Leaderboards
          </Link>
          {isAuthenticated && (
            <Link to="/new" className="nav-item">
              + Buat Thread
            </Link>
          )}
        </nav>

        {/* Auth section */}
        <div className="auth">
          {isAuthenticated ? (
            <>
              <Avatar src={user?.avatar} name={user?.name} size={32} />
              <span className="username">{user?.name}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-link">
                Login
              </Link>
              <Link to="/register" className="auth-link register">
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .header {
          background-color: #2c3e50;
          color: white;
          padding: 10px 0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-text {
          font-weight: 700;
          font-size: 18px;
          letter-spacing: 0.5px;
          color: #ffffff;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .nav-item {
          color: #ecf0f1;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav-item:hover {
          color: #00b4d8;
        }

        .auth {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .username {
          font-weight: 500;
          color: #f8f9fa;
        }

        .logout-btn {
          background-color: #e74c3c;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          color: white;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s;
        }

        .logout-btn:hover {
          background-color: #c0392b;
        }

        .auth-link {
          color: #ecf0f1;
          text-decoration: none;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .auth-link:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .auth-link.register {
          background: #00b4d8;
          color: white;
        }

        .auth-link.register:hover {
          background: #0096c7;
        }
      `}</style>
    </header>
  );
}
