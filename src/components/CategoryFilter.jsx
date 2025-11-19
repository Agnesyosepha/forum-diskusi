import React from "react";

export default function CategoryFilter({ categories, selected, onSelect }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="category-filter">
      <h3 className="filter-title">Kategori Populer</h3>
      <div className="filter-tags">
        <button
          onClick={() => onSelect("")}
          className={`tag ${!selected ? "active" : ""}`}
        >
          #semua
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`tag ${selected === cat ? "active" : ""}`}
            onClick={() => onSelect(cat)}
          >
            #{cat}
          </button>
        ))}
      </div>

      <style jsx>{`
        .category-filter {
          margin-bottom: 24px;
          padding: 12px 0;
        }

        .filter-title {
          font-size: 16px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 8px;
        }

        .filter-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .tag {
          background: #fff;
          border: 1px solid #d1d5db;
          border-radius: 20px;
          padding: 6px 14px;
          font-size: 14px;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tag:hover {
          background: #f1f5f9;
          border-color: #94a3b8;
        }

        .tag.active {
          background: #2c3e50;
          color: white;
          border-color: #2c3e50;
          font-weight: 500;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 600px) {
          .filter-tags {
            gap: 6px;
          }
          .tag {
            font-size: 13px;
            padding: 5px 10px;
          }
        }
      `}</style>
    </div>
  );
}
