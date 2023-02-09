import axios, { AxiosResponse } from "axios";
import { User } from "../../../types";
import { Response } from "../../../types/Response.type";
import axiosClient from "../axiosClient";
import { IAuth } from "./type";

export function loginAPI(props: { code: string }) {
  const { code } = props;
  return axios.post<Response<IAuth>>(
    "http://52.74.214.224:8080/api/v1/auth/loginGoogle",
    {
      code,
      redirectUri: "https://auth.expo.io/@zero94/BikesApp",
    }
  );
}

export function getAuthenticatedUserAPI() {
  return axiosClient.get<Response<User>>("/users/getInfo");
}

export function refreshTokenAPI(refreshToken: string) {
  return axios.post<Response<IAuth>>(
    "http://52.74.214.224:8080/api/v1/auth/refreshToken",
    {
      refreshToken,
    }
  );
}
