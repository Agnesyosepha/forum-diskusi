// src/features/auth/RegisterForm.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./authThunks";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(form));
    if (registerUser.fulfilled.match(result)) {
      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    }
  };

  return (
    <div className="auth-container">
      <h2>Daftar Akun Baru</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>Nama</label>
        <input
          name="name"
          placeholder="Nama lengkap"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="Alamat email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {loading ? <LoadingSpinner /> : <button type="submit">Daftar</button>}
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Sudah punya akun? <Link to="/login">Login di sini</Link>
      </p>

      <style jsx>{`
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
