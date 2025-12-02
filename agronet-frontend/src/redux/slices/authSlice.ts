import {createSlice} from "@reduxjs/toolkit";

export interface AuthState {
    isAuthenticated: boolean;
    user: object | null;
  }
  
  const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
  };


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
          },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
});


export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;