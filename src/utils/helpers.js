// src/utils/helpers.js

// Capitalize huruf pertama string
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Potong text dengan batas tertentu
export function truncateText(text, limit = 150) {
  if (!text) return '';
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

// Simpan dan ambil token dari localStorage
export function saveToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function removeToken() {
  localStorage.removeItem('token');
}
