// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ThreadPage from "./pages/ThreadPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NewThreadForm from "./features/threads/NewThreadForm";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/threads/:id" element={<ThreadPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route
          path="/new"
          element={
            <ProtectedRoute>
              <NewThreadForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <h2 style={{ textAlign: "center" }}>
              404 - Halaman tidak ditemukan
            </h2>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
