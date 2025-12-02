import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL;

export interface Comment {
  id: number
  post: number
  userId: number
  content: string
  created: string
  updatedAt?: string
}

interface CommentState {
  comments: Comment[]
  loading: boolean
  error: string | null
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
}

// Utils
const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem("user_token") || '""');
  return { Authorization: `Bearer ${token}` }
}

// Thunks
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURL}/forum/posts/${postId}/comments/`, {
        headers: getAuthHeaders(),
      })
      return response.data as Comment[]
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch comments')
    }
  }
)

// posts/<int:post_id>/comments/

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (    { postId, content }: { postId: number; content: string },
    { rejectWithValue }) => {
    try {
      const data = {"post":postId, "content":content}
      const response = await axios.post(`${baseURL}/forum/posts/${postId}/comments/`, data, {
        headers: getAuthHeaders(),
      })
      return response.data as Comment
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add comment')
    }
  }
)

export const editComment = createAsyncThunk(
  'comments/editComment',
  async ({ id, content }: { id: number; content: string }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${baseURL}/forum/comments/update/${id}/`,
        { content },
        { headers: getAuthHeaders() }
      )
      return response.data as Comment
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to edit comment')
    }
  }
)

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (id: number, thunkAPI) => {
    try {
      await axios.delete(`${baseURL}/comments/delete/${id}/`, {
        headers: getAuthHeaders(),
      })
      return id
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete comment')
    }
  }
)

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = []
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchComments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false
        state.comments = action.payload
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Add
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload)
      })

      // Edit
      .addCase(editComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(c => c.id === action.payload.id)
        if (index !== -1) state.comments[index] = action.payload
      })

      // Delete
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(c => c.id !== action.payload)
      })
  },
})

export const { clearComments } = commentSlice.actions
export default commentSlice.reducer
