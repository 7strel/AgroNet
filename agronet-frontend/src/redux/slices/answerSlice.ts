// src/features/answer/answerSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'


const baseURL = import.meta.env.VITE_BASE_URL;

export type Answer = {
  id: string
  author: any
  title: string
  body: string
  // tags: string[]
  created_at: string
  updated_at: string
  is_answered: boolean
}

interface AnswerState {
  answers: Answer[]
  loading: boolean
  error: string | null
}

const initialState: AnswerState = {
  answers: [],
  loading: false,
  error: null,
}

// ✅ Auth Header Helper
const authHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

// 🔄 Fetch answers for a question
export const fetchAnswers = createAsyncThunk(
  'answer/fetchAll',
  async ({ questionId, user_token }: { questionId: string; user_token: string }) => {
    const response = await axios.get<Answer[]>(
      `${baseURL}/ai/questions/${questionId}/answers/`,
      authHeaders(user_token)
    )
    return response.data
  }
)

// ➕ Post a new answer to a question
export const createAnswer = createAsyncThunk(
  'answer/create',
  async ({
    questionId,
    data,
    user_token,
  }: {
    questionId: string
    data: Omit<Answer, 'id' | 'created_at' | 'updated_at'>
    user_token: string
  }) => {
    const response = await axios.post<Answer>(
      `${baseURL}/ai/questions/${questionId}/answers/`,
      data,
      authHeaders(user_token)
    )
    return response.data
  }
)

const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnswers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAnswers.fulfilled, (state, action: PayloadAction<Answer[]>) => {
        state.answers = action.payload
        state.loading = false
      })
      .addCase(fetchAnswers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch answers.'
      })

      .addCase(createAnswer.fulfilled, (state, action: PayloadAction<Answer>) => {
        state.answers.push(action.payload)
      })
  },
})

export default answerSlice.reducer
