// src/pages/ThreadPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import ThreadDetail from "../features/threads/ThreadDetail";
import CommentItem from "../features/threads/CommentItem";
import {
  createComment,
  fetchThreadById,
} from "../features/threads/threadsThunks";
import { addCommentOptimistic } from "../features/threads/threadsSlice";

export default function ThreadPage() {
  const [content, setContent] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail, loading } = useSelector((s) => s.threads);
  const { user, token } = useSelector((s) => s.auth);

  // 🔹 Ambil data thread detail dari API berdasarkan ID
  useEffect(() => {
    dispatch(fetchThreadById(id));
  }, [dispatch, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const optimistic = {
      id: `temp-${Date.now()}`,
      content,
      createdAt: new Date().toISOString(),
      owner: user,
    };

    dispatch(addCommentOptimistic({ threadId: id, comment: optimistic }));
    setContent("");

    if (token) {
      await dispatch(createComment({ threadId: id, content }));
    }
  };

  if (loading || !detail) return <LoadingSpinner />;

  return (
    <>
      <Header />
      <main className="thread-page">
        <ThreadDetail thread={detail} />

        <section className="comments-section">
          <h3>💬 Komentar ({detail.comments?.length || 0})</h3>

          <form onSubmit={handleSubmit} className="comment-form">
            <textarea
              placeholder="Tulis komentar..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              required
            />
            <button type="submit">Kirim Komentar</button>
          </form>

          <div className="comment-list">
            {detail.comments && detail.comments.length > 0 ? (
              detail.comments.map((c) => <CommentItem key={c.id} comment={c} />)
            ) : (
              <p className="no-comment">Belum ada komentar.</p>
            )}
          </div>
        </section>
      </main>

      <style jsx>{`
        .thread-page {
          max-width: 800px;
          margin: 30px auto;
          background: #fff;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        .comments-section {
          margin-top: 40px;
        }

        h3 {
          margin-bottom: 16px;
          font-size: 1.3rem;
          color: #333;
        }

        .comment-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        textarea {
          resize: vertical;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }

        button {
          align-self: flex-end;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 16px;
          cursor: pointer;
          transition: background 0.2s;
        }

        button:hover {
          background: #0056b3;
        }

        .comment-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .no-comment {
          color: #777;
          font-style: italic;
        }
      `}</style>
    </>
  );
}
