// src/features/threads/ThreadDetail.jsx
import React from "react";
import Avatar from "../../components/Avatar";
import { formatDistanceToNow } from "date-fns";

export default function ThreadDetail({ thread }) {
  if (!thread) return null;

  return (
    <div className="thread-detail">
      {/* HEADER THREAD */}
      <div className="thread-header">
        <Avatar
          src={thread.owner?.avatar}
          name={thread.owner?.name}
          size={50}
        />
        <div>
          <h2>{thread.title}</h2>
          <p className="meta">
            Dibuat oleh <strong>{thread.owner?.name}</strong> •{" "}
            {formatDistanceToNow(new Date(thread.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>

      {/* BODY THREAD */}
      <div
        className="thread-body"
        dangerouslySetInnerHTML={{ __html: thread.body }}
      />

      {/* KOMENTAR */}
      <h3>Komentar ({thread.comments?.length || 0})</h3>
      <div className="comments">
        {thread.comments?.length ? (
          thread.comments.map((c) => (
            <div key={c.id} className="comment-item">
              <Avatar src={c.owner?.avatar} name={c.owner?.name} size={40} />
              <div className="comment-content">
                <p className="comment-owner">{c.owner?.name}</p>
                <p>{c.content}</p>
                <span className="comment-date">
                  {formatDistanceToNow(new Date(c.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-comments">Belum ada komentar.</p>
        )}
      </div>

      <style jsx>{`
        .thread-detail {
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 30px auto;
        }
        .thread-header {
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        .thread-body {
          margin-bottom: 30px;
          line-height: 1.6;
        }
        .comments {
          margin-top: 10px;
        }
        .comment-item {
          display: flex;
          gap: 10px;
          background: #f9f9f9;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 10px;
        }
        .comment-content p {
          margin: 0;
        }
        .comment-date {
          font-size: 12px;
          color: gray;
        }
        .no-comments {
          text-align: center;
          color: gray;
        }
      `}</style>
    </div>
  );
}
