import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import StoreKeyConstants from "../../constants/StoreKeyConstants";
import { logout } from "../../redux/authentication/authentication.action";
import { useAppDispatch } from "../../redux/store";
import { refreshTokenAPI } from "./AuthController";

const DEFAULT_BASE_URL = Constants!.expoConfig!.extra!.BACKEND_ENDPOINT;
let isRefreshing = false;

const axiosClient = axios.create({
  baseURL: DEFAULT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-mock-match-request-body": true,
    "x-mock-match-request-headers": true,
  },
});

//set client base URL again
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.status === 401) {
      delete axiosClient.defaults.headers.common.Authorization;
      // const dispatch = useAppDispatch();
      // refreshToken(error, () => {
      //   delete axiosClient.defaults.headers.common.Authorization;
      //   dispatch(logout());
      // });
    }
    return Promise.reject(error);
  }
);

export const setAuthToken = (token?: string) => {
  if (token) {
    axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosClient.defaults.headers.common.Authorization;
  }
};

// hàm để refresh token
const refreshToken = async (error: AxiosError, logout: Function) => {
  const originConfig = error.config;
  const refreshToken = await SecureStore.getItemAsync(
    StoreKeyConstants.REFRESH_TOKEN
  );
  if (!refreshToken) {
    logout();
    return;
  }
  try {
    const {
      data: { data },
    } = await refreshTokenAPI(refreshToken);
    await SecureStore.setItemAsync(
      StoreKeyConstants.TOKEN as string,
      data.token
    );
    await SecureStore.setItemAsync(
      StoreKeyConstants.REFRESH_TOKEN as string,
      data.refreshToken
    );
    setAuthToken(data.token);
    //retry
    const retry = await axiosClient(error?.config as AxiosRequestConfig);
    console.log({ test: retry });
    return retry;
  } catch (error) {
    logout();
    return;
  }
};

export default axiosClient;
