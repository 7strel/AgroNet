import { RootState } from "../store";
import { UserState, User } from "../slices/userSlice";

export const selectUsers = (state: RootState): UserState => state.users;
export const selectUsersList = (state: RootState): User[] => state.users.users;
export const selectSelectedUser = (state: RootState) => state.users.selectedUser;
export const selectUsersLoading = (state: RootState): boolean => state.users.loading;
export const selectUsersError = (state: RootState): string | null => state.users.error;