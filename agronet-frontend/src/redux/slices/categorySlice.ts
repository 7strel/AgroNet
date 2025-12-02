
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

// Define Category type
export interface Category {
  id: number;
  title: string;
}

// Define the state type
export interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("user_token") || '""');
      const response = await axios.get(`${baseURL}/marketplace/categories/`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the request
        },        
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);



const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch categories";
      });
      
  },
});

export default categorySlice.reducer;
