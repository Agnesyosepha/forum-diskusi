// src/features/auth/LoginForm.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchMyProfile } from "./authThunks";
import { useNavigate, Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchMyProfile());
      navigate("/");
    }
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="auth-container">
      <h2>Login Akun</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>Email</label>
        <input
          type="email"
          placeholder="Masukkan email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Masukkan password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {loading ? <LoadingSpinner /> : <button type="submit">Login</button>}

        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>

      <style>{`
      .auth-container {
        max-width: 400px;
        margin: 40px auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #fff;
      }
      .auth-form {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      input {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 6px;
      }
      button {
        padding: 8px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
      }
      .error {
        color: red;
        font-size: 0.9em;
      }
    `}</style>
    </div>
  );
}
