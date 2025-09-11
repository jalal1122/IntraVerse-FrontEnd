import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService.js";

const initialState = {
  isLoggedIn: document.cookie.includes("user="),
  adminPosts: [],
  adminPostsLoading: false,
  adminPostsError: null,
  adminPostsSuccess: false,
};

export const getAdminPosts = createAsyncThunk(
  "admin/adminPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getAdminPosts();
      console.log(response.data);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetAdminPosts: (state) => {
      state.adminPostsLoading = false;
      state.adminPostsError = null;
      state.adminPostsSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminPosts.pending, (state) => {
        state.adminPostsLoading = true;
      })
      .addCase(getAdminPosts.fulfilled, (state, action) => {
        state.adminPostsLoading = false;
        state.adminPosts = action.payload;
        state.adminPostsSuccess = true;
      })
      .addCase(getAdminPosts.rejected, (state, action) => {
        state.adminPostsLoading = false;
        state.adminPostsSuccess = false;
        state.adminPostsError = action.payload;
        state.adminPosts = [];
      });
  },
});

export const { resetAdminPosts } = adminSlice.actions;

export default adminSlice.reducer;
