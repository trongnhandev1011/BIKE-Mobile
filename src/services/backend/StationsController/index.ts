import { PaginationResponse } from "../../../types/Response.type";
import axiosClient from "../axiosClient";
import { Station } from "./type";

export const getAllStationsAPI = (page: number = 1, pageSize: number = 20) =>
  axiosClient.get<PaginationResponse<Station>>("/stations", {
    params: {
      page: page,
      pageSize: pageSize,
    },
  });
