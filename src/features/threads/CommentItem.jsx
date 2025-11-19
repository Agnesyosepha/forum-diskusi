import React from "react";
import Avatar from "../../components/Avatar";
import { formatRelativeTime } from "../../utils/date";

export default function CommentItem({ comment }) {
  const { content, createdAt, owner } = comment;

  return (
    <div className="comment-item">
      <div className="comment-header">
        <Avatar src={owner?.avatar} name={owner?.name} size={32} />
        <div>
          <strong>{owner?.name}</strong>
          <small className="time">{formatRelativeTime(createdAt)}</small>
        </div>
      </div>
      <p>{content}</p>

      <style>{`
        .comment-item {
          border-bottom: 1px solid #eee;
          padding: 8px 0;
        }
        .comment-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .time {
          color: #777;
          font-size: 0.8em;
          margin-left: 6px;
        }
      `}</style>
    </div>
  );
}
