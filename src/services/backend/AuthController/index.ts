import axios, { AxiosResponse } from "axios";
import { User } from "../../../types";
import { Response } from "../../../types/Response.type";
import axiosClient from "../axiosClient";
import { AuthResponse } from "./type";

export function loginAPI(props: { code: string }) {
  const { code } = props;
  return axios.post<Response<AuthResponse>>(
    "http://52.74.214.224:8080/api/v1/auth/google/login",
    {
      code,
      redirectUri: "https://auth.expo.io/@zero94/BikesApp",
    }
  );
}

export function getAuthenticatedUserAPI() {
  return axiosClient.get<Response<User>>("/users/me");
}

export function refreshTokenAPI(refreshToken: string) {
  return axios.post<Response<AuthResponse>>(
    "http://52.74.214.224:8080/api/v1/auth/refresh",
    {
      refreshToken,
    }
  );
}

export function logoutAPI(refreshToken: string) {
  return axiosClient.post<Response<boolean>>("/auth/logout", {
    refreshToken,
  });
}
