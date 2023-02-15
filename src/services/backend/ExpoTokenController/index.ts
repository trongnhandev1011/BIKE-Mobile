import { Response } from "../../../types/Response.type";
import axiosClient from "../axiosClient";

export const addMyExpoToken = (token: string) =>
  axiosClient.post<Response<{ success: boolean }>>("/expo-tokens", {
    token,
  });

export const removeMyExpoToken = (token: string) =>
  axiosClient.put<Response<{ success: boolean }>>("/expo-tokens", {
    token,
  });
