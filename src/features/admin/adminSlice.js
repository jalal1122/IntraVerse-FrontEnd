import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService.js";

const initialState = {
  isLoggedIn: document.cookie.includes("user="),

  // Data States
  createPost: null,
  adminPosts: [],
  editPost: null,
  updatePost: null,
  deletePost: null,
  refreshTrendingPosts: null,

  // Loading States
  adminPostsLoading: false,
  createPostLoading: false,
  editPostLoading: false,
  updatePostLoading: false,
  deletePostLoading: false,
  refreshTrendingPostsLoading: false,

  // Error States
  adminPostsError: null,
  createPostError: null,
  editPostError: null,
  updatePostError: null,
  deletePostError: null,
  refreshTrendingPostsError: null,

  // Success States
  adminPostsSuccess: false,
  createPostSuccess: false,
  editPostSuccess: false,
  updatePostSuccess: false,
  deletePostSuccess: false,
  refreshTrendingPostsSuccess: false,
};

export const refreshTrendingPosts = createAsyncThunk(
  "admin/refreshTrendingPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.refreshTrendingPosts();
      console.log("Refreshing trending posts...");

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

// Delete Post by Id
export const deletePost = createAsyncThunk(
  "admin/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminService.deletePost(id);
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

// Update Post
export const updatePost = createAsyncThunk(
  "admin/updatePost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await adminService.updatePost(postData);
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

// Get Edit Post
export const getEditPost = createAsyncThunk(
  "admin/editPost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminService.getEditPost(id);
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

// Create New Post
export const createPost = createAsyncThunk(
  "admin/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await adminService.createPost(postData);
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
    resetCreatePost: (state) => {
      state.createPostLoading = false;
      state.createPostError = null;
      state.createPostSuccess = false;
    },
    resetEditPost: (state) => {
      state.editPostLoading = false;
      state.editPostError = null;
      state.editPostSuccess = false;
    },
    resetUpdatePost: (state) => {
      state.updatePostLoading = false;
      state.updatePostError = null;
      state.updatePostSuccess = false;
    },
    resetDeletePost: (state) => {
      state.deletePostLoading = false;
      state.deletePostError = null;
      state.deletePostSuccess = false;
    },
    resetRefreshTrendingPosts: (state) => {
      state.refreshTrendingPostsLoading = false;
      state.refreshTrendingPostsError = null;
      state.refreshTrendingPostsSuccess = false;
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
      })

      // create post Conditons
      .addCase(createPost.pending, (state) => {
        state.createPostLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.createPostLoading = false;
        state.createPost = action.payload;
        state.createPostSuccess = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.createPostLoading = false;
        state.createPostSuccess = false;
        state.createPostError = action.payload;
        state.createPost = null;
      })

      // Get Edit Post
      .addCase(getEditPost.pending, (state) => {
        state.editPostLoading = true;
      })
      .addCase(getEditPost.fulfilled, (state, action) => {
        state.editPostLoading = false;
        state.editPost = action.payload;
        state.editPostSuccess = true;
      })
      .addCase(getEditPost.rejected, (state, action) => {
        state.editPostLoading = false;
        state.editPostSuccess = false;
        state.editPostError = action.payload;
        state.editPost = null;
      })

      // Update Post
      .addCase(updatePost.pending, (state) => {
        state.updatePostLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.updatePostLoading = false;
        state.updatePost = action.payload;
        state.updatePostSuccess = true;
        state.editPost = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.updatePostLoading = false;
        state.updatePostSuccess = false;
        state.updatePostError = action.payload;
        state.updatePost = null;
      })

      // Delete Post
      .addCase(deletePost.pending, (state) => {
        state.deletePostLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deletePostLoading = false;
        state.deletePost = action.payload;
        state.deletePostSuccess = true;
        state.adminPosts = state.adminPosts.filter(
          (post) => post._id !== action.payload._id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.deletePostLoading = false;
        state.deletePostSuccess = false;
        state.deletePostError = action.payload;
        state.deletePost = null;
      })

      // Refresh Trending Posts
      .addCase(refreshTrendingPosts.pending, (state) => {
        state.refreshTrendingPostsLoading = true;
      })
      .addCase(refreshTrendingPosts.fulfilled, (state, action) => {
        state.refreshTrendingPostsLoading = false;
        state.refreshTrendingPosts = action.payload;
        state.refreshTrendingPostsSuccess = true;
      })
      .addCase(refreshTrendingPosts.rejected, (state, action) => {
        state.refreshTrendingPostsLoading = false;
        state.refreshTrendingPostsSuccess = false;
        state.refreshTrendingPostsError = action.payload;
        state.refreshTrendingPosts = null;
      });
  },
});

export const {
  resetAdminPosts,
  resetCreatePost,
  resetDeletePost,
  resetEditPost,
  resetRefreshTrendingPosts,
  resetUpdatePost,
} = adminSlice.actions;

export default adminSlice.reducer;
