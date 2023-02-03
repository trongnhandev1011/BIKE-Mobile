import { createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import {
  getAuthenticatedUserAPI,
  loginAPI,
} from "../../services/backend/AuthController";
import { setAuthToken } from "../../services/backend/axiosClient";
import StoreKeyConstants from "../../constants/StoreKeyConstants";

export const initializeAuth = createAsyncThunk<{ user: object }>(
  "auth/init",
  async (_, thunkAPI) => {
    try {
      //TODO: call api
      return { user: {} };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk<{ user: object }, { authCode: string }>(
  "auth/login",
  async ({ authCode }, thunkAPI) => {
    try {
      console.log(authCode);
      const { data } = await loginAPI({ code: authCode });
      console.log(data);
      setAuthToken(data.data.token);
      await SecureStore.setItemAsync(
        StoreKeyConstants.TOKEN as string,
        data.data.token
      );
      await SecureStore.setItemAsync(
        StoreKeyConstants.REFRESH_TOKEN as string,
        data.data["refreshToken"]
      );
      const {
        data: { data: userData },
      } = await getAuthenticatedUserAPI();
      return { user: userData };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk<void, void>("auth/logout", async () => {
  setAuthToken(undefined);
  await SecureStore.deleteItemAsync(
    Constants!.expoConfig!.extra!.TOKEN_KEY as string
  );
  SecureStore.deleteItemAsync(
    Constants!.expoConfig!.extra!.USER_STORAGE as string
  );
});
