import { createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import {
  getAuthenticatedUserAPI,
  loginAPI,
  logoutAPI,
  refreshTokenAPI,
} from "../../services/backend/AuthController";
import { setAuthToken } from "../../services/backend/axiosClient";
import StoreKeyConstants from "../../constants/StoreKeyConstants";
import {
  addMyExpoToken,
  removeMyExpoToken,
} from "../../services/backend/ExpoTokenController";
import registerForPushNotificationsAsync from "../../services/notificationService/registerForPushNotifcation";

export const initializeAuth = createAsyncThunk<{ user: object }, void>(
  "auth/init",
  async (_, thunkAPI) => {
    try {
      //TODO: call refresh api later
      const token = await SecureStore.getItemAsync(
        StoreKeyConstants.TOKEN as string
      );
      if (!token) throw new Error("Invalid token");
      setAuthToken(token);
      const {
        data: { data: userData },
      } = await getAuthenticatedUserAPI();
      const expoToken = await registerForPushNotificationsAsync();
      if (expoToken) {
        const {
          data: { data },
        } = await addMyExpoToken(expoToken);
        console.log(data);
        if (!data.success) console.log("Can't add expo token to BE");
      } else console.log("Can't get expo token");
      return { user: userData };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk<{ user: object }, { authCode: string }>(
  "auth/login",
  async ({ authCode }, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await loginAPI({ code: authCode });
      console.log(data);
      setAuthToken(data.token);
      await SecureStore.setItemAsync(
        StoreKeyConstants.TOKEN as string,
        data.token
      );
      await SecureStore.setItemAsync(
        StoreKeyConstants.REFRESH_TOKEN as string,
        data.refreshToken
      );
      const {
        data: { data: userData },
      } = await getAuthenticatedUserAPI();
      const expoToken = await registerForPushNotificationsAsync();
      if (expoToken) {
        const {
          data: { data },
        } = await addMyExpoToken(expoToken);

        if (!data.success) console.log("Can't add expo token to BE");
      } else console.log("Can't get expo token");
      return { user: userData };
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk<void, void>("auth/logout", async () => {
  try {
    const expoToken = await registerForPushNotificationsAsync();
    if (expoToken) {
      const {
        data: { data },
      } = await removeMyExpoToken(expoToken);

      if (!data.success) console.log("Can't remove expo token to BE");
    } else console.log("Can't get expo token");
  } catch (e) {
    //ignore
  }
  try {
    const refreshToken = await SecureStore.getItemAsync(
      StoreKeyConstants.REFRESH_TOKEN
    );
    const res = await logoutAPI(refreshToken as string);
  } catch (e) {
    console.log(e);
  } finally {
    setAuthToken(undefined);
    await SecureStore.deleteItemAsync(StoreKeyConstants.TOKEN as string);
    await SecureStore.deleteItemAsync(
      StoreKeyConstants.REFRESH_TOKEN as string
    );
  }
});
