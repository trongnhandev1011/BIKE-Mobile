import { PaginationResponse, Response } from "../../../types/Response.type";
import axiosClient from "../axiosClient";
import { SimpleTrip, TripDetail } from "./type";

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

export const getTripDetailAPI = (tripId: number) =>
  axiosClient.get<Response<TripDetail>>(`/trips/${tripId}`);

export const updateTripStatusAPI = (tripId: number, tripStatus: string) =>
  axiosClient.put<Response<boolean>>(`/trips/${tripId}?action=${tripStatus}`);
