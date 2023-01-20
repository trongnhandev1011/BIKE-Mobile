import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Constants from "expo-constants";

const DEFAULT_BASE_URL = Constants!.expoConfig!.extra!.BACKEND_ENDPOINT;

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

export default axiosClient;
