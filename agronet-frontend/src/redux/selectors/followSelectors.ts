import { RootState } from "../store";

export const selectFollowers = (state: RootState) => state.follow.followers;
export const selectFollowing = (state: RootState) => state.follow.following;
export const selectFollowLoading = (state: RootState) => state.follow.loading;
export const selectFollowError = (state: RootState) => state.follow.error;
