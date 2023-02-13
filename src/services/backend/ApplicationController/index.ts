import { PaginationResponse } from "../../../types/Response.type";
import axiosClient from "../axiosClient";
import { SimpleApplication } from "./type";

export const getAllApplicationsAPI = (
  page: number = 1,
  pageSize: number = 20,
  status?: string
) =>
  axiosClient.get<PaginationResponse<SimpleApplication>>("/applications", {
    params: {
      page: page,
      pageSize: pageSize,
      status: status,
    },
  });
