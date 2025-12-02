import { RootState } from "../store";
import { PostsState, Post } from "../slices/postsSlice";

export const selectPosts = (state: RootState): PostsState => state.posts;
export const selectPostsList = (state: RootState): Post[] => state.posts.posts;
export const selectPostsLoading = (state: RootState): boolean => state.posts.loading;
export const selectPostsError = (state: RootState): string | null => state.posts.error;

// 🆕 New selectors
export const selectNewestPosts = (state: RootState): Post[] => state.posts.newestPosts;
export const selectRecentPosts = (state: RootState): Post[] => state.posts.recentPosts;
