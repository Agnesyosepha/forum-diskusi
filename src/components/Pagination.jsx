// src/components/Pagination.jsx
import React from "react";

export default function Pagination({ current, total, onPageChange }) {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          className={page === current ? "active" : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <style jsx>{`
        .pagination {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin: 16px 0;
        }
        button {
          padding: 6px 12px;
          border: 1px solid #ccc;
          background-color: white;
          cursor: pointer;
          border-radius: 6px;
        }
        .active {
          background-color: #007bff;
          color: white;
          border-color: #007bff;
        }
      `}</style>
    </div>
  );
}
