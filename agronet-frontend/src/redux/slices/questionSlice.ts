// src/features/question/questionSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL;

export type Question = {
  answers: any;
  id: string
  author: any
  title: string
  body: string
  // tags: string[]
  created_at: string
  updated_at: string
  is_answered: boolean
}

export interface QuestionState {
  questions: Question[]
  loading: boolean
  error: string | null
}

const initialState: QuestionState = {
  questions: [],
  loading: false,
  error: null,
}

// ✅ Helper for Auth headers
const authHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
})

// // 🔄 CRUD Thunks with user_token
// export const fetchQuestions = createAsyncThunk(
//   'question/fetchAll',
//   async (user_token: any) => {
//     const response = await axios.get<Question[]>(`${baseURL}/ai/questions/`, authHeaders(user_token))
//     return response.data
//   }
// )
// Async thunk to fetch products
export const fetchQuestions = createAsyncThunk<Question[], void, { rejectValue: string }>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("user_token") || '""');
      const response = await axios.get(`${baseURL}/ai/questions/`, {
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




export const createQuestion = createAsyncThunk(
  'question/create',
  async ({ data, user_token }: { data: Omit<Question, 'id' | 'created_at' | 'updated_at' | 'answers'>; user_token: string }) => {
    const response = await axios.post<Question>(`${baseURL}/ai/questions/`, data, authHeaders(user_token))
    return response.data
  }
)

export const updateQuestion = createAsyncThunk(
  'question/update',
  async ({ id, data, user_token }: { id: string; data: Partial<Question>; user_token: string }) => {
    const response = await axios.put<Question>(`${baseURL}/ai/questions/${id}/`, data, authHeaders(user_token))
    return response.data
  }
)

// export const deleteQuestion = createAsyncThunk(
//   'question/delete',
//   async ({ id, user_token }: { id: string; user_token: string }) => {
//     await axios.delete(`${API_URL}${id}/`, authHeaders(user_token))
//     return id
//   }
// )

// 🧠 Slice
const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchQuestions.fulfilled, (state, action: PayloadAction<Question[]>) => {
        state.questions = action.payload
        state.loading = false
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch questions.'
      })

      .addCase(createQuestion.fulfilled, (state, action: PayloadAction<Question>) => {
        state.questions.push(action.payload)
      })

      .addCase(updateQuestion.fulfilled, (state, action: PayloadAction<Question>) => {
        const index = state.questions.findIndex(q => q.id === action.payload.id)
        if (index !== -1) {
          state.questions[index] = action.payload
        }
      })

      // .addCase(deleteQuestion.fulfilled, (state, action: PayloadAction<string>) => {
      //   state.questions = state.questions.filter(q => q.id !== action.payload)
      // })
  },
})

export default questionSlice.reducer

