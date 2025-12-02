import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/refresh/');
      localStorage.setItem('refresh_token', response.data.token); // Persist token
      return response.data.token;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('refresh_token') || null,
  isAuthenticated: !!localStorage.getItem('refresh_token'),
  user: JSON.parse(localStorage.getItem('user_token') || 'null'),
  loading: false,
  error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
      setUser(state, action: PayloadAction<any>) {
        state.isAuthenticated = true;
        state.user = action.payload;
        localStorage.setItem('user_token', JSON.stringify(action.payload)); // Persist user
      },
      logout(state) {
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_token');
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(refreshToken.pending, (state) => {
          state.loading = true; // Show loading while refreshing token
          state.error = null;
        })
        .addCase(refreshToken.fulfilled, (state, action: PayloadAction<string>) => {
          state.token = action.payload;
          state.isAuthenticated = true;
          state.loading = false;
          localStorage.setItem('refresh_token', action.payload); // Persist new token
        })
        .addCase(refreshToken.rejected, (state) => {
          state.loading = false;
          state.isAuthenticated = false;
        });
    },

});


export const { setUser, logout} = authSlice.actions;


export default authSlice.reducer;

