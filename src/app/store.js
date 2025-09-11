import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/User/userSlice.js";
import colorReducer from "../features/Colors/colorSlice.js";
import postsReducer from "../features/Posts/postsSlice.js";
import adminReducer from "../features/admin/adminSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    color: colorReducer,
    posts: postsReducer,
    admin: adminReducer,
  },
});
