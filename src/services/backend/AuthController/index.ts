import { AxiosResponse } from "axios";
import { User } from "../../../types";
import { Response } from "../../../types/Response.type";
import axiosClient from "../axiosClient";
import { IAuth } from "./type";

export function loginAPI(props: { code: string }) {
  const { code } = props;
  return axiosClient.post<Response<IAuth>>("/login", { code });
}

export function getAuthenticatedUserAPI() {
  return axiosClient.get<Response<User>>("/me");
}

export function refreshTokenAPI(refreshToken: string) {
  return axiosClient.post<Response<IAuth>>("/refresh_token", {
    refreshToken,
  });
}
