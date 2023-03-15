import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";
import { initializeAuth, login, logout } from "./authentication.action";

export type AuthenticationState = {
  isAuthUser: boolean;
  user: User | {};
  dataFetched: boolean;
  isFetching: boolean;
  isError: boolean;
  error: any;
};

let initialState: AuthenticationState = {
  isAuthUser: false,
  user: {},
  dataFetched: false,
  isFetching: false,
  isError: false,
  error: null,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        isAuthUser: Object.keys(action.payload).length !== 0,
        user: action.payload,
      };
    },
    initializeAuth: (state, action) => {
      return {
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeAuth.pending, (state) => ({
      ...state,
      isFetching: true,
      dataFetched: false,
      error: false,
    }));
    builder.addCase(initializeAuth.fulfilled, (state, action) => ({
      ...state,
      isAuthUser: true,
      user: action.payload.user,
      isFetching: false,
      dataFetched: true,
      error: false,
    }));
    builder.addCase(initializeAuth.rejected, (state, action) => ({
      isAuthUser: false,
      user: {},
      isFetching: false,
      dataFetched: true,
      isError: false,
      error: !!action.payload,
    }));
    builder.addCase(login.fulfilled, (state, action) => ({
      ...state,
      isAuthUser: true,
      user: action.payload.user,
      isFetching: false,
      dataFetched: true,
      error: false,
    }));
    builder.addCase(login.pending, (state) => ({
      ...state,
      isFetching: true,
      dataFetched: false,
      error: false,
    }));
    builder.addCase(login.rejected, (state, action) => ({
      isAuthUser: false,
      user: {},
      isFetching: false,
      dataFetched: true,
      isError: true,
      error: action.payload,
    }));
    builder.addCase(logout.fulfilled, (state, action) => ({
      ...initialState,
      isAuthUser: false,
      user: {},
    }));
    builder.addCase(logout.rejected, (state, action) => ({
      ...initialState,
      isAuthUser: false,
      user: {},
    }));
  },
});

export const { setUser } = authenticationSlice.actions;

export default authenticationSlice.reducer;
