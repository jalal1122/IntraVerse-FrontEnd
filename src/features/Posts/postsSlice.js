import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService.js";

const initialState = {
  posts: [],
  trendingPosts: [],
  post: null,
  postIsLoading: false,
  postsIsLoading: false,
  trendingPostsIsLoading: false,
  postsIsError: null,
  trendingPostsIsError: null,
  postIsError: null,
  postsIsSuccess: false,
  trendingPostsIsSuccess: false,
  postIsSuccess: false,
};

// Get Post by Id
export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (id, thunkAPI) => {
    try {
      const response = await postsService.getPostById(id);
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

// get all posts
export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, thunkAPI) => {
    try {
      const response = await postsService.getAllPosts();
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
    postsReset: (state) => {
      state.postsIsLoading = false;
      state.postsIsError = null;
      state.postsIsSuccess = false;
    },
    trendingPostsReset: (state) => {
      state.trendingPostsIsLoading = false;
      state.trendingPostsIsError = null;
      state.trendingPostsIsSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // // // /// ////////
      // get Trending Posts
      ////////////////////
      .addCase(getTrendingPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrendingPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.isSuccess = true;
        state.trendingPosts = action.payload;
      })
      .addCase(getTrendingPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      /////////////
      // get all posts
      ////////////
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      /////////////
      // get post by id
      ////////////
      .addCase(getPostById.pending, (state) => {
        state.postIsLoading = true;
        state.postIsError = null;
        state.postIsSuccess = false;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.postIsLoading = false;
        state.postIsError = null;
        state.postIsSuccess = true;
        state.post = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.postIsLoading = false;
        state.postIsError = action.payload;
        state.postIsSuccess = false;
      });
  },
});

export const { postsReset, trendingPostsReset } = postsSlice.actions;
export default postsSlice.reducer;
