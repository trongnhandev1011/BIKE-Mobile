import { PaginationResponse, Response } from "../../../types/Response.type";
import axiosClient from "../axiosClient";
import { SimpleTrip } from "./type";

export const getCurrentTripAPI = () =>
  axiosClient.get<Response<SimpleTrip>>("/trips/ongoing");

export const getAllTripsAPI = (
  page: number = 1,
  pageSize: number = 20,
  status?: string,
  query: string = ""
) =>
  axiosClient.get<PaginationResponse<SimpleTrip>>("/trips", {
    params: {
      page: page,
      pageSize: pageSize,
      status: status,
      query: query,
    },
  });
