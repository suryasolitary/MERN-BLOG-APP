import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentuser: null,
  loading: false,
  error: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SigninStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    SigninSuccess: (state, action) => {
      state.currentuser = action.payload;
      state.loading = false;
      state.error = null;
    },
    SigninFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { SigninStart, SigninSuccess, SigninFailure } = UserSlice.actions;

export default UserSlice.reducer;
