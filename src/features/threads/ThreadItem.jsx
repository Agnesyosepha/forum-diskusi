// src/features/threads/ThreadItem.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import {
  upvoteThread,
  downvoteThread,
  neutralizeThreadVote,
} from "./threadsThunks";

export default function ThreadItem({ thread }) {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth || {});

  const {
    id: threadId,
    title,
    body,
    category,
    createdAt,
    owner,
    totalComments,
    upVotesBy = [],
    downVotesBy = [],
  } = thread || {};

  const isUpvoted = upVotesBy.includes(user?.id);
  const isDownvoted = downVotesBy.includes(user?.id);

  const handleUpvote = () => {
    if (!user) return alert("Silakan login untuk memberikan vote!");
    if (isUpvoted) dispatch(neutralizeThreadVote(threadId));
    else dispatch(upvoteThread(threadId));
  };

  const handleDownvote = () => {
    if (!user) return alert("Silakan login untuk memberikan vote!");
    if (isDownvoted) dispatch(neutralizeThreadVote(threadId));
    else dispatch(downvoteThread(threadId));
  };

  return (
    <article className="thread-item">
      {category && <span className="category">#{category}</span>}

      <h3 className="thread-title">
        <Link to={`/threads/${threadId}`}>{title}</Link>
      </h3>

      <div
        className="thread-body"
        dangerouslySetInnerHTML={{
          __html:
            (body || "").slice(0, 200) +
            ((body || "").length > 200 ? "..." : ""),
        }}
      />

      <div className="thread-meta">
        <div className="meta-left">
          <button
            onClick={handleUpvote}
            className={`vote-btn ${isUpvoted ? "active" : ""}`}
          >
            👍 {upVotesBy.length}
          </button>
          <button
            onClick={handleDownvote}
            className={`vote-btn ${isDownvoted ? "active" : ""}`}
          >
            👎 {downVotesBy.length}
          </button>
          <span>💬 {totalComments || 0}</span>
        </div>
        <div className="meta-right">
          <span>
            {createdAt
              ? formatDistanceToNow(new Date(createdAt), {
                  addSuffix: true,
                  locale: id,
                })
              : ""}
          </span>
          <span className="dot">•</span>
          <span>Dibuat oleh {owner?.name}</span>
        </div>
      </div>

      <style>{`
        .thread-item {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 16px 20px;
          margin-bottom: 16px;
          transition: box-shadow 0.2s ease;
        }

        .thread-item:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
        }

        .category {
          background: #eef2ff;
          color: #4f46e5;
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 13px;
          display: inline-block;
          margin-bottom: 8px;
        }

        .thread-title {
          margin: 0 0 8px;
          font-size: 18px;
          font-weight: 700;
        }

        .thread-title a {
          color: #1e3a8a;
          text-decoration: none;
        }

        .thread-title a:hover {
          text-decoration: underline;
        }

        .thread-body {
          color: #374151;
          font-size: 15px;
          line-height: 1.5;
          margin-bottom: 10px;
        }

        .thread-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
          font-size: 13px;
          color: #6b7280;
        }

        .meta-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .vote-btn {
          background: #f3f4f6;
          border: none;
          border-radius: 6px;
          padding: 4px 8px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .vote-btn:hover {
          background: #e5e7eb;
        }

        .vote-btn.active {
          background: #4f46e5;
          color: white;
        }

        .dot {
          color: #9ca3af;
          margin: 0 6px;
        }

        @media (max-width: 600px) {
          .thread-title {
            font-size: 16px;
          }
          .thread-body {
            font-size: 14px;
          }
        }
      `}</style>
    </article>
  );
}
