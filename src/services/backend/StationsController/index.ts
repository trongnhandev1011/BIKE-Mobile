import { PaginationResponse } from "../../../types/Response.type";
import axiosClient from "../axiosClient";
import { Station } from "./type";

export const getAllStationsAPI = (fromStationId?: number) =>
  axiosClient.get<PaginationResponse<Station>>(
    "http://52.74.214.224:8080/api/index/v1/stations",
    {
      params: {
        fromStationId: fromStationId,
      },
    }
  );
