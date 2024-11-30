import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance, protectedInstance } from "../../../services/instance";

const initialState = {
  // user register
  register: { status: "idle", error: null },
  login: {
    status: "idle",
    error: null,
  },
  currentUser: {
    status: "idle",
    user: null,
    error: null,
  },

  logout: {
    status: "idle",
    error: null,
  },
};

export const registerUser = createAsyncThunk(
  "/user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/user/create", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/user/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/user/login", loginData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "/user/currentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await protectedInstance.get("/user/me");
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "/user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await protectedInstance.get("/user/logout");
      return response?.data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.register.status = "loading";
        state.register.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.register.status = "succeeded";
        state.register.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.register.status = "failed";
        state.register.error = action.payload;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.login.status = "loading";
        state.login.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.status = "succeeded";
        state.login.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.status = "failed";
        state.login.error = action.payload;
      })
      .addCase(getCurrentUser.pending, (state, action) => {
        state.currentUser.status = "loading";
        state.currentUser.error = null;
        state.currentUser.user = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.currentUser.status = "succeeded";
        state.currentUser.user = action.payload;
        state.currentUser.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.currentUser.status = "failed";
        state.currentUser.user = null;
        state.currentUser.error = action.payload;
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.logout.status = "loading";
        state.logout.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.logout.status = "succeeded";
        state.logout.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logout.status = "failed";
        state.logout.error = action.payload;
      });
  },
});

export default userSlice.reducer;

// selectors

// register
export const selectUserRegisterStatus = (state) => state.user.register.status;
export const selectUserRegisterError = (state) => state.user.register.error;

// login
export const selectUserLoginStatus = (state) => state.user.login.status;
export const selectUserLOginError = (state) => state.user.login.error;

// current user
export const selectCurrentUserStatus = (state) => state.user.currentUser.status;
export const selectCurrentUser = (state) => state.user.currentUser.user;
export const selectCurrentUserError = (state) => state.user.currentUser.error;

// logout
export const selectUserLogoutStatus = (state) => state.user.logout.status;
export const selectUserLogoutError = (state) => state.user.logout.error;
