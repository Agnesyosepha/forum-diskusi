// src/features/threads/ThreadsList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchThreads } from "./threadsThunks";
import ThreadItem from "./ThreadItem";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function ThreadsList() {
  const dispatch = useDispatch();
  // buat defensif bila state threads belum ada
  const threadsState = useSelector((s) => s.threads) || {};
  const items = threadsState.items || [];
  const loading = threadsState.loading;
  const error = threadsState.error;

  useEffect(() => {
    dispatch(fetchThreads());
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className="error-message">⚠️ Terjadi kesalahan: {error}</div>;

  return (
    <div className="threads-list">
      <h2 className="threads-title">💬 Diskusi tersedia</h2>

      {items.length === 0 ? (
        <p className="empty">Belum ada thread yang tersedia.</p>
      ) : (
        items.map((thread) => <ThreadItem key={thread.id} thread={thread} />)
      )}

      <style>{`
        .threads-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 20px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .threads-title {
          font-size: 20px;
          font-weight: 700;
          color: #1e3a8a;
          margin-bottom: 10px;
        }

        .empty {
          text-align: center;
          color: #6b7280;
          font-style: italic;
        }

        .error-message {
          color: #e11d48;
          background: #fee2e2;
          padding: 10px 14px;
          border-radius: 6px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
