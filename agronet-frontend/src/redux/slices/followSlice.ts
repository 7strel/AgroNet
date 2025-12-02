// src/redux/slices/followSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export interface User {
  id: number;
  username: string;
  profile_image: string;
}

interface FollowState {
  followers: User[];
  following: User[];
  loading: boolean;
  error: string | null;
}

const initialState: FollowState = {
  followers: [],
  following: [],
  loading: false,
  error: null,
};


// Follow user
export const followUser = createAsyncThunk<
  void,
  number,
  { rejectValue: string }
>("follow/followUser", async (userId, { rejectWithValue }) => {
  try {
    const token = JSON.parse(localStorage.getItem("user_token") || '""');
    await axios.post(`${baseURL}/forum/user/${userId}/follow/`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Unfollow user
export const unfollowUser = createAsyncThunk<
  void,
  number,
  { rejectValue: string }
>("follow/unfollowUser", async (userId, { rejectWithValue }) => {
  try {
    const token = JSON.parse(localStorage.getItem("user_token") || '""');
    await axios.post(`${baseURL}/forum/user/${userId}/unfollow/`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Get followers
export const fetchFollowers = createAsyncThunk<
  User[],
  number,
  { rejectValue: string }
>("follow/fetchFollowers", async (userId, { rejectWithValue }) => {
  try {
    const token = JSON.parse(localStorage.getItem("user_token") || '""');
    const response = await axios.get(`${baseURL}/forum/users/${userId}/followers/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Get following
export const fetchFollowing = createAsyncThunk<
  User[],
  number,
  { rejectValue: string }
>("follow/fetchFollowing", async (userId, { rejectWithValue }) => {
  try {
    const token = JSON.parse(localStorage.getItem("user_token") || '""');
    const response = await axios.get(`${baseURL}/forum/user/${userId}/following/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch followers
      .addCase(fetchFollowers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.followers = action.payload;
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load followers";
      })

      // Fetch following
      .addCase(fetchFollowing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowing.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.following = action.payload;
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load following";
      })

      // Follow user
      .addCase(followUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(followUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to follow user";
      })

      // Unfollow user
      .addCase(unfollowUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unfollowUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to unfollow user";
      });
  },
});

export default followSlice.reducer;
