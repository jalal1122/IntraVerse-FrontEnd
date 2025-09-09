import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "./userService";

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// Register user
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, thunkApi) => {
    try {
      return await userService.RegisterUser(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, thunkApi) => {
    try {
      return await userService.loginUser(userData);
    } catch (error) {
      {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkApi.rejectWithValue(message);
      }
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkApi) => {
    try {
      console.log("Attempting to logout user...");
      const result = await userService.logoutUser();
      console.log("Logout successful:", result);
      return result;
    } catch (error) {
      console.error("Logout failed:", error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

const initialState = {
  user: user,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // Handle register user actions
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      // Handle login user actions
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      // Handle logout user actions
      .addCase(logoutUser.pending, (state) => {
        console.log("Logout pending...");
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        console.log("Logout fulfilled, clearing user state");
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null; // Clear user data on logout
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.log("Logout rejected:", action.payload);
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null; // Ensure user is cleared on error
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
