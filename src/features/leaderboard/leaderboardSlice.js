import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { forumService } from '../../api/forumService';

// GET /leaderboards
export const fetchLeaderboards = createAsyncThunk(
  'leaderboard/fetchLeaderboards',
  async (_, { rejectWithValue }) => {
    try {
      const res = await forumService.getLeaderboards();
      return res.data.leaderboards;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboards.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchLeaderboards.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(fetchLeaderboards.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export default leaderboardSlice.reducer;
