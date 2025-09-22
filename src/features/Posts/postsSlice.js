import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService.js";

const initialState = {
  posts: [],
  trendingPosts: [],
  post: null,
  postsComments: [],
  makeComment: null,
  postSearchResults: [],
  postIsLoading: false,
  postsIsLoading: false,
  trendingPostsIsLoading: false,
  postsCommentsIsLoading: false,
  makeCommentIsLoading: false,
  postSearchResultsIsLoading: false,
  postsIsError: null,
  trendingPostsIsError: null,
  postIsError: null,
  postSearchResultsIsError: null,
  postsCommentsIsError: null,
  makeCommentIsError: null,
  postsIsSuccess: false,
  trendingPostsIsSuccess: false,
  postIsSuccess: false,
  postsCommentsIsSuccess: false,
  makeCommentIsSuccess: false,
  postSearchResultsIsSuccess: false,
};

// search posts by query
export const searchPosts = createAsyncThunk(
  "posts/searchPosts",
  async (query, thunkAPI) => {
    try {
      const response = await postsService.searchPosts(query);
      return response.data
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

// Add a comment to a post
export const addComment = createAsyncThunk(
  "posts/addComment",
  async (commentData, thunkAPI) => {
    try {
      const response = await postsService.addComment(commentData);
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

// get Post Comments by Post Id
export const getPostComments = createAsyncThunk(
  "posts/getPostComments",
  async (postId, thunkAPI) => {
    try {
      const response = await postsService.getPostComments(postId);

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
    postsCommentsReset: (state) => {
      state.postsCommentsIsLoading = false;
      state.postsCommentsIsError = null;
      state.postsCommentsIsSuccess = false;
    },
    postSearchResultsReset: (state) => {
      state.postSearchResultsIsLoading = false;
      state.postSearchResultsIsError = null;
      state.postSearchResultsIsSuccess = false;
    },
    makeCommentReset: (state) => {
      state.makeCommentIsLoading = false;
      state.makeCommentIsError = null;
      state.makeCommentIsSuccess = false;
    },
    postReset: (state) => {
      state.postIsLoading = false;
      state.postIsError = null;
      state.postIsSuccess = false;
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
        state.postsIsLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.postsIsLoading = false;
        state.postsIsError = null;
        state.postsIsSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.postsIsLoading = false;
        state.postsIsError = action.payload;
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
      })

      /////////////
      // get post comments by post id
      ////////////
      .addCase(getPostComments.pending, (state) => {
        state.postsCommentsIsLoading = true;
        state.postsCommentsIsError = null;
        state.postsCommentsIsSuccess = false;
      })
      .addCase(getPostComments.fulfilled, (state, action) => {
        state.postsCommentsIsLoading = false;
        state.postsCommentsIsError = null;
        state.postsCommentsIsSuccess = true;
        state.postsComments = action.payload;
      })
      .addCase(getPostComments.rejected, (state, action) => {
        state.postsCommentsIsLoading = false;
        state.postsCommentsIsError = action.payload;
        state.postsCommentsIsSuccess = false;
      })

      /////////////
      // search posts
      ////////////
      .addCase(searchPosts.pending, (state) => {
        state.postSearchResultsIsLoading = true;
        state.postSearchResultsIsError = null;
        state.postSearchResultsIsSuccess = false;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.postSearchResultsIsLoading = false;
        state.postSearchResultsIsError = null;
        state.postSearchResultsIsSuccess = true;
        state.postSearchResults = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.postSearchResultsIsLoading = false;
        state.postSearchResultsIsError = action.payload;
        state.postSearchResultsIsSuccess = false;
      });
  },
});

export const {
  postsReset,
  trendingPostsReset,
  postsCommentsReset,
  postSearchResultsReset,
  makeCommentReset,
  postReset,
} = postsSlice.actions;
export default postsSlice.reducer;
