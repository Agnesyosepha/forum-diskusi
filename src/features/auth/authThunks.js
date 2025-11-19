// src/features/auth/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { forumService } from '../../api/forumService';

// Register
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await forumService.register({ name, email, password });
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// Login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await forumService.login({ email, password });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// Fetch profile (uses token)
export const fetchMyProfile = createAsyncThunk(
  'auth/fetchMyProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await forumService.getMyProfile(token);
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
