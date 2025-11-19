import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createThread } from "./threadsThunks";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function NewThreadForm() {
  const dispatch = useDispatch();
  const { creating, error } = useSelector((s) => s.threads);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    const result = await dispatch(createThread({ title, body, category }));
    if (createThread.fulfilled.match(result)) {
      alert("Thread berhasil dibuat!");
      setTitle("");
      setBody("");
      setCategory("");
    }
  };

  return (
    <div className="new-thread">
      <h2>Buat Thread Baru</h2>
      <form onSubmit={handleSubmit}>
        <label>Judul</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul thread"
          required
        />

        <label>Kategori</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Kategori (opsional)"
        />

        <label>Isi Thread</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="5"
          required
        />

        {creating ? (
          <LoadingSpinner />
        ) : (
          <button type="submit">Buat Thread</button>
        )}
        {error && <p className="error">{error}</p>}
      </form>

      <style jsx>{`
        .new-thread {
          max-width: 500px;
          margin: 20px auto;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        input,
        textarea {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        button {
          background: #007bff;
          color: white;
          border: none;
          padding: 8px;
          border-radius: 6px;
        }
        .error {
          color: red;
        }
      `}</style>
    </div>
  );
}
