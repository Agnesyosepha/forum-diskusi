import React, { useState, useMemo } from "react";
import ThreadsList from "../features/threads/ThreadsList";
import CategoryFilter from "../components/CategoryFilter";
import Header from "../components/Header";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [threads, setThreads] = useState([]);

  // ambil kategori unik dari threads
  const categories = useMemo(() => {
    const cats = new Set(threads.map((t) => t.category).filter(Boolean));
    return Array.from(cats);
  }, [threads]);

  return (
    <>
      <Header />
      <main className="homepage">
        <div className="container">
          <h1 className="page-title">💬 Forum Diskusi</h1>

          {/* Filter kategori */}
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          {/* Daftar Threads */}
          <ThreadsList setThreads={setThreads} filter={selectedCategory} />
        </div>
      </main>

      <style jsx>{`
        .homepage {
          background-color: #f3f4f6;
          min-height: 100vh;
          padding: 40px 20px;
          display: flex;
          justify-content: center;
        }

        .container {
          background: white;
          border-radius: 10px;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
          padding: 30px 40px;
          width: 100%;
          max-width: 1000px;
        }

        .page-title {
          text-align: center;
          font-size: 26px;
          color: #1e3a8a;
          margin-bottom: 24px;
          font-weight: 700;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 12px;
        }

        @media (max-width: 768px) {
          .container {
            padding: 20px;
          }
          .page-title {
            font-size: 22px;
          }
        }
      `}/style>
    </>
  );
}
