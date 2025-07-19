import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null as string | null,
  },
  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
