import { Auth, User } from "@/types/user.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null as User | null,
  token: null as string | null,
  loading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<Auth>) => {
      state.user = payload.user;
      state.token = payload.token;
      state.loading = false;
    },
    initialLoading: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
    },
  },
});

export const { login, logout, initialLoading } = authSlice.actions;

export default authSlice.reducer;
