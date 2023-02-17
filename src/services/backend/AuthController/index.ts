import axios from "axios";
import { UpdateProfileData, User } from "../../../types";
import { Response } from "../../../types/Response.type";
import axiosClient from "../axiosClient";
import { AuthResponse } from "./type";
import * as ImagePicker from "expo-image-picker";

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

export function uploadMedia(file: ImagePicker.ImagePickerAsset) {
  let localUri = file.uri;
  let filename = localUri.split("/").pop() as string;

  // Infer the type of the image
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  const mediaFile = new FormData();
  mediaFile.append("file", { uri: localUri, name: filename, type });
  return axiosClient.post<Response<{ path: string }>>("/medias", mediaFile, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function uploadImage(filePath: string) {
  let localUri = filePath;
  let filename = localUri.split("/").pop() as string;

  // Infer the type of the image
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  const mediaFile = new FormData();
  mediaFile.append("file", { uri: localUri, name: filename, type });
  return axiosClient.post<Response<{ path: string }>>("/medias", mediaFile, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function updateProfile(profileData: UpdateProfileData) {
  return axiosClient.put<Response<{ success: boolean }>>(
    "/users/me",
    profileData
  );
}
