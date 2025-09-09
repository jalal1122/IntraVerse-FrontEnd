import { createSlice } from "@reduxjs/toolkit";

const mode = localStorage.getItem("mode") || "light";

const colorSlice = createSlice({
  name: "color",
  initialState: {
    mode: mode,
    colors: {
      textColor: "#000000",
      primaryColor: "#4B6BFB",
      secondaryColor: "#F4F4F5",
      bgColor: "#181A2A",
    },
  },
  reducers: {
    getMode: (state, action) => {
      state.mode = action.payload;
      if (action.payload === "dark") {
        state.colors.textColor = "#000";
        state.colors.bgColor = "#fff";
      } else {
        state.colors.textColor = "#fff";
        state.colors.bgColor = "#181A2A";
      }
    },
  },
});

export const { getMode } = colorSlice.actions;
export default colorSlice.reducer;
