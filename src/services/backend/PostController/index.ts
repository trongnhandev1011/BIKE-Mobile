import { PaginationResponse, Response } from "../../../types/Response.type";
import axiosClient from "../axiosClient";
import { CreatePost, SimplePost } from "./type";

export const createPostAPI = (values: CreatePost) =>
  axiosClient.post<Response<SimplePost>>("/posts", values);

export const getAllPostsAPI = (
  page: number = 1,
  pageSize: number = 20,
  role?: string | undefined,
  query: string = ""
) => {
  const params = {
    page: page,
    pageSize: pageSize,
    role: role,
    query: query,
  };
  !role && delete params.role;

  return axiosClient.get<PaginationResponse<SimplePost>>("/posts", {
    params: params,
  });
};

export const getAllPublicPostsAPI = (
  page: number = 1,
  pageSize: number = 20,
  role?: string | undefined,
  query: string = ""
) => {
  const params = {
    page: page,
    pageSize: pageSize,
    role: role,
    query: query,
  };
  !role && delete params.role;

  return axiosClient.get<PaginationResponse<SimplePost>>(
    "http://52.74.214.224:8080/api/index/v1/posts",
    {
      params: params,
    }
  );
};
