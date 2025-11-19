// src/features/threads/threadsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchThreads,
  fetchThreadById,
  createThread,
  createComment,
  upvoteThread,
  downvoteThread,
  neutralizeThreadVote,
  upvoteComment,
  downvoteComment,
  neutralizeCommentVote,
} from './threadsThunks';

const initialState = {
  items: [],
  detail: null,
  loading: false,
  error: null,
  creating: false,
};

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    addCommentOptimistic(state, action) {
      const { threadId, comment } = action.payload;

      // jika sedang melihat detail thread yg sama
      if (state.detail && state.detail.id === threadId) {
        if (!state.detail.comments) state.detail.comments = [];
        state.detail.comments.unshift(comment);
        state.detail.totalComments = (state.detail.totalComments || 0) + 1;
      }

      // update jumlah komentar di daftar thread
      const threadInList = state.items.find((x) => x.id === threadId);
      if (threadInList) {
        threadInList.totalComments = (threadInList.totalComments || 0) + 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      //  GET /threads
      .addCase(fetchThreads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  GET /threads/:id
      .addCase(fetchThreadById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThreadById.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(fetchThreadById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  POST /threads
      .addCase(createThread.pending, (state) => {
        state.creating = true;
      })
      .addCase(createThread.fulfilled, (state, action) => {
        state.creating = false;
        state.items.unshift(action.payload);
      })
      .addCase(createThread.rejected, (state) => {
        state.creating = false;
      })

      //  POST /threads/:id/comments
      .addCase(createComment.fulfilled, (state, action) => {
        const { threadId, comment } = action.payload;

        // jika sedang buka thread detail yg sama, tambahkan komentar
        if (state.detail && state.detail.id === threadId) {
          if (!state.detail.comments) state.detail.comments = [];
          state.detail.comments.unshift(comment);
          state.detail.totalComments = (state.detail.totalComments || 0) + 1;
        }

        // update total komentar di list
        const threadInList = state.items.find((x) => x.id === threadId);
        if (threadInList) {
          threadInList.totalComments = (threadInList.totalComments || 0) + 1;
        }
      })

      //  PATCH /threads/:id/upvote
      .addCase(upvoteThread.fulfilled, (s, a) => {
        const { threadId, vote } = a.payload;
        const t = s.items.find((x) => x.id === threadId);
        if (t) {
          const { userId } = vote;
          t.upVotesBy = [...new Set([...(t.upVotesBy || []), userId])];
          t.downVotesBy = (t.downVotesBy || []).filter((id) => id !== userId);
        }
      })

      //  PATCH /threads/:id/downvote
      .addCase(downvoteThread.fulfilled, (s, a) => {
        const { threadId, vote } = a.payload;
        const t = s.items.find((x) => x.id === threadId);
        if (t) {
          const { userId } = vote;
          t.downVotesBy = [...new Set([...(t.downVotesBy || []), userId])];
          t.upVotesBy = (t.upVotesBy || []).filter((id) => id !== userId);
        }
      })

      //  PATCH /threads/:id/neutral-vote
      .addCase(neutralizeThreadVote.fulfilled, (s, a) => {
        const { threadId, vote } = a.payload;
        const t = s.items.find((x) => x.id === threadId);
        if (t) {
          const { userId } = vote;
          t.upVotesBy = (t.upVotesBy || []).filter((id) => id !== userId);
          t.downVotesBy = (t.downVotesBy || []).filter((id) => id !== userId);
        }
      })

      //  PATCH /comments/:id/upvote
      .addCase(upvoteComment.fulfilled, (s, a) => {
        const { commentId, vote } = a.payload;
        const c = s.detail?.comments?.find((x) => x.id === commentId);
        if (c) {
          const { userId } = vote;
          c.upVotesBy = [...new Set([...(c.upVotesBy || []), userId])];
          c.downVotesBy = (c.downVotesBy || []).filter((id) => id !== userId);
        }
      })

      //  PATCH /comments/:id/downvote
      .addCase(downvoteComment.fulfilled, (s, a) => {
        const { commentId, vote } = a.payload;
        const c = s.detail?.comments?.find((x) => x.id === commentId);
        if (c) {
          const { userId } = vote;
          c.downVotesBy = [...new Set([...(c.downVotesBy || []), userId])];
          c.upVotesBy = (c.upVotesBy || []).filter((id) => id !== userId);
        }
      })

      //  PATCH /comments/:id/neutral-vote
      .addCase(neutralizeCommentVote.fulfilled, (s, a) => {
        const { commentId, vote } = a.payload;
        const c = s.detail?.comments?.find((x) => x.id === commentId);
        if (c) {
          const { userId } = vote;
          c.upVotesBy = (c.upVotesBy || []).filter((id) => id !== userId);
          c.downVotesBy = (c.downVotesBy || []).filter((id) => id !== userId);
        }
      });
  },
});

export const { addCommentOptimistic } = threadsSlice.actions;
export default threadsSlice.reducer;
