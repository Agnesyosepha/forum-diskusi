import React from "react";
import CommentItem from "./CommentItem";

export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) return <p>Belum ada komentar.</p>;

  return (
    <div>
      {comments.map((c) => (
        <CommentItem key={c.id} comment={c} />
      ))}
    </div>
  );
}
