// src/components/LoadingSpinner.jsx
import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="spinner">
      <div className="loader"></div>
      <p>Memuat data...</p>
      <style jsx>{`
        .spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 30px 0;
        }
        .loader {
          width: 36px;
          height: 36px;
          border: 4px solid #ddd;
          border-top-color: #007bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
