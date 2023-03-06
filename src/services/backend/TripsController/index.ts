import { PaginationResponse, Response } from "../../../types/Response.type";
import axiosClient from "../axiosClient";
import { SimpleTrip, TripDetail } from "./type";

export const getCurrentTripAPI = () =>
  axiosClient.get<Response<SimpleTrip>>("/trips/ongoing");

export const getAllTripsAPI = (
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
  return axiosClient.get<PaginationResponse<SimpleTrip>>(
    `/trips?${new URLSearchParams(finalParams).toString()}`
  );
};

export const getTripDetailAPI = (tripId: number) =>
  axiosClient.get<Response<TripDetail>>(`/trips/${tripId}`);

export const updateTripStatusAPI = (tripId: number, tripStatus: string) =>
  axiosClient.put<Response<boolean>>(`/trips/${tripId}?action=${tripStatus}`);
