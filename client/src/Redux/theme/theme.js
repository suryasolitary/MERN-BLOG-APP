import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const ThemeReducers = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toogleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toogleTheme } = ThemeReducers.actions;
export default ThemeReducers.reducer;
