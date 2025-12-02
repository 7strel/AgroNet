import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export interface Post {
  id: number;
  title: string;
  image: string;
  content: string;
  views: number;
  comments: string[];
}

export interface PostsState {
  posts: Post[];
  selectedPost: Post | null;
  newestPosts: Post[];
  recentPosts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  newestPosts: [],
  recentPosts: [],
  loading: false,
  error: null,
};

// Fetch posts
export const fetchPosts = createAsyncThunk<Post[], void, { rejectValue: string }>(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("user_token") || '""');
      const response = await axios.get(`${baseURL}/forum/posts/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Add post
export const addPost = createAsyncThunk<Post, { title: string; content: string; image:  File | null  }, { rejectValue: string }>(
  "posts/addPost",
  async ({ title, content, image }, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("user_token") || '""');
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);
      const response = await axios.post(
        `${baseURL}/forum/create-post/`, formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch post details
export const fetchPostDetails = createAsyncThunk(
  "posts/fetchPostDetails",
  async (id: number, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("user_token") || '""');
      const response = await axios.get(`${baseURL}/forum/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editPost = createAsyncThunk<
  Post,
  { id: number; title: string; text: string; post_image: string },
  { rejectValue: string }
>(
  "posts/editPost",
  async ({ id, title, text, post_image }, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("user_token") || '""');
      const response = await axios.put(
        `${baseURL}/forum/update-post/${id}/`,
        { title, text, post_image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("user_token") || '""');
      await axios.delete(`${baseURL}/forum/delete-post/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // return the id to remove it from the state
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const incrementPostViews = createAsyncThunk<
  Post,
  number,
  { rejectValue: string }
>("posts/incrementPostViews", async (postId, { rejectWithValue }) => {
  try {
    const token = JSON.parse(localStorage.getItem("user_token") || '""');
    const response = await axios.post(
      `${baseURL}/forum/post/${postId}/increment-view/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});


export const fetchNewestAndRecentPosts = createAsyncThunk<
  { newest: Post[]; recent: Post[] }, // ✅ Return type
  void,
  { rejectValue: string }
>(
  "posts/fetchNewestAndRecentPosts",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("user_token") || '""');
      const response = await axios.get(`${baseURL}/forum/posts/newest-recent/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // this should be { newest, recent }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);






const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSelectedPost(state, action: PayloadAction<Post>) {
      state.selectedPost = action.payload;
    },
    clearSelectedProduct(state) {
      state.selectedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch posts";
      })

      // Fetch post details
      .addCase(fetchPostDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostDetails.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.selectedPost = action.payload;
      })
      .addCase(fetchPostDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch post details";
      })

      // Add post
      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.posts.unshift(action.payload); // Add new post to the top
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add post";
      })
      // Edit Post
      .addCase(editPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.posts = state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        );
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to edit post";
      })

      // Delete Post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete post";
      })

      // Newest and Recent
      .addCase(fetchNewestAndRecentPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewestAndRecentPosts.fulfilled, (state, action: PayloadAction<{ newest: Post[]; recent: Post[] }>) => {
        state.loading = false;
        state.newestPosts = action.payload.newest;
        state.recentPosts = action.payload.recent;
      })
      .addCase(fetchNewestAndRecentPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch newest and recent posts";
      })

  },
});

export const { setSelectedPost, clearSelectedProduct } = postsSlice.actions;

export default postsSlice.reducer;
