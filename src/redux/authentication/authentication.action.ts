import { createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { loginAPI } from "../../services/backend/AuthController";
import { setAuthToken } from "../../services/backend/axiosClient";

export const login = createAsyncThunk<{ user: object }, { authCode: string }>(
  "auth/login",
  async ({ authCode }, thunkAPI) => {
    try {
      console.log(authCode);
      const { data } = await loginAPI({ code: authCode });
      console.log(data);
      setAuthToken(data.token);
      await SecureStore.setItemAsync(
        Constants!.expoConfig!.extra!.TOKEN_KEY as string,
        data.token
      );
      await SecureStore.setItemAsync(
        Constants!.expoConfig!.extra!.USER_STORAGE as string,
        JSON.stringify(data.user)
      );
      return { user: data.user };
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
