import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService.js";

const initialState = {
  posts: [],
  trendingPosts: [],
  isLoading: false,
  isError: null,
  isSuccess: false,
};

// get the trending Posts
export const getTrendingPosts = createAsyncThunk(
  "posts/getTrendingPosts",
  async (_, thunkAPI) => {
    try {
      const response = await postsService.getTrendingPosts();
      console.log(response.data);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrendingPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrendingPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trendingPosts = action.payload;
      })
      .addCase(getTrendingPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;
