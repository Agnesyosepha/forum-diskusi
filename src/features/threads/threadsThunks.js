// src/features/threads/threadsThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { forumService } from '../../api/forumService';

// fetch all threads -> API returns { data: { threads: [...] } }
export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async (_, { rejectWithValue }) => {
    try {
      const res = await forumService.getThreads();
      return res.data.threads;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// fetch detail -> API returns { data: { detailThread: {...} } }
export const fetchThreadById = createAsyncThunk(
  'threads/fetchThreadById',
  async (threadId, { rejectWithValue }) => {
    try {
      const res = await forumService.getThreadDetail(threadId);
      return res.data.detailThread;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// create thread -> request { title, body, category? } -> response { data: { thread: {...} } }
export const createThread = createAsyncThunk(
  'threads/createThread',
  async ({ title, body, category }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await forumService.createThread(
        { title, body, category },
        token,
      );
      return res.data.thread;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const createComment = createAsyncThunk(
  'threads/createComment',
  async ({ threadId, content }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await forumService.createComment(
        threadId,
        { content },
        token,
      );
      return { threadId, comment: res.data.comment };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const upvoteThread = createAsyncThunk(
  'threads/upvoteThread',
  async (threadId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await forumService.upvoteThread(threadId, token);
      return { threadId, vote: res.data.vote };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const downvoteThread = createAsyncThunk(
  'threads/downvoteThread',
  async (threadId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await forumService.downvoteThread(threadId, token);
      return { threadId, vote: res.data.vote };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const neutralizeThreadVote = createAsyncThunk(
  'threads/neutralizeThreadVote',
  async (threadId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await forumService.neutralizeThreadVote(threadId, token);
      return { threadId, vote: res.data.vote };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

//  COMMENT VOTES
export const upvoteComment = createAsyncThunk(
  'threads/upvoteComment',
  async ({ threadId, commentId }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await forumService.upvoteComment(threadId, commentId, token);
      return { threadId, commentId, vote: res.data.vote };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const downvoteComment = createAsyncThunk(
  'threads/downvoteComment',
  async ({ threadId, commentId }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await forumService.downvoteComment(
        threadId,
        commentId,
        token,
      );
      return { threadId, commentId, vote: res.data.vote };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const neutralizeCommentVote = createAsyncThunk(
  'threads/neutralizeCommentVote',
  async ({ threadId, commentId }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await forumService.neutralizeCommentVote(
        threadId,
        commentId,
        token,
      );
      return { threadId, commentId, vote: res.data.vote };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
