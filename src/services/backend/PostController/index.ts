import { User } from "../../../types";
import { PaginationResponse, Response } from "../../../types/Response.type";
import axiosClient from "../axiosClient";
import { CreatePost, PostDetail, SimplePost } from "./type";

export const createPostAPI = (values: CreatePost) =>
  axiosClient.post<Response<SimplePost>>("/posts", values);

export const getAllPostsAPI = (
  page: number = 1,
  pageSize: number = 20,
  params: any = {}
) => {
  const tmp = {
    page: page,
    pageSize: pageSize,
    ...params,
  };
  const finalParams = {};
  Object.keys(tmp).forEach((key) => {
    if (tmp[key] !== undefined) finalParams[key] = tmp[key];
  });

  return axiosClient.get<PaginationResponse<SimplePost>>(
    `/posts?${new URLSearchParams(finalParams).toString()}`
  );
};

export const getAllPublicPostsAPI = (
  page: number = 1,
  pageSize: number = 20,
  params: any = {}
) => {
  const tmp = {
    page: page,
    pageSize: pageSize,
    ...params,
  };
  const finalParams = {};
  Object.keys(tmp).forEach((key) => {
    if (tmp[key] !== undefined) finalParams[key] = tmp[key];
  });

  return axiosClient.get<PaginationResponse<SimplePost>>(
    `http://52.74.214.224:8080/api/index/v1/posts?${new URLSearchParams(
      finalParams
    ).toString()}`
  );
};

export const getPostDetail = (postId: number) => {
  return axiosClient.get<Response<PostDetail>>(`posts/${postId}`);
};

export const cancelPost = (postId: number) => {
  return axiosClient.delete<Response<SimplePost>>(`posts/${postId}`);
};

export const getAppliers = (postId: number) => {
  return axiosClient.get<PaginationResponse<User>>(`posts/${postId}/appliers`);
};

export const acceptAppliers = (postId: number, applierId: string) => {
  return axiosClient.put<Response<{ success: boolean }>>(
    `posts/${postId}/appliers/${applierId}`
  );
};

export const rejectAppliers = (postId: number, applierId: string) => {
  return axiosClient.delete<Response<{ success: boolean }>>(
    `posts/${postId}/appliers/${applierId}`
  );
};

export const applyPost = (postId: number) => {
  return axiosClient.post<Response<{ success: boolean }>>(
    `posts/${postId}/appliers`,
    {
      params: {
        id: postId,
      },
    }
  );
};

export const cancelApplyPost = (postId: number) => {
  return axiosClient.delete<Response<{ success: boolean }>>(
    `posts/${postId}/appliers`,
    {
      params: {
        id: postId,
      },
    }
  );
};
