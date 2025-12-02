import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


const baseURL = import.meta.env.VITE_BASE_URL;

interface Instructor {
  id: string;
  name: string;
  email: string;
}

// Define Course type
export interface Course {
  id: number;
  title: string;
  instructor:Instructor;
  price: number;
  description: string;
  avatar: string;
}

// Define the state type
export interface CoursesState {
  courses: Course[];
  selectedCourse: Course | null;
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  courses: [],
  selectedCourse: null,
  loading: false,
  error: null,
};

// Async thunk to fetch courses
export const fetchCourses = createAsyncThunk<Course[], void, { rejectValue: string }>(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("user_token") || '""');
      const response = await axios.get(`${baseURL}/learn/courses/`, {
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

// Slice
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
      setSelectedCourse(state, action: PayloadAction<Course>) {
        state.selectedCourse= action.payload
      },
      clearSelectedCourse: (state) => {
        state.selectedCourse = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch courses";
      });
  },
});

export const { setSelectedCourse } = coursesSlice.actions

export default coursesSlice.reducer;
