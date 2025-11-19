// src/components/Avatar.jsx
import React from "react";

export default function Avatar({ src, name, size = 40 }) {
  const fallback = name ? name.charAt(0).toUpperCase() : "?";
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "#ddd",
        overflow: "hidden",
        textTransform: "uppercase",
        fontWeight: "bold",
      }}
      title={name}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          width={size}
          height={size}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
}
