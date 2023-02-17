import { Response } from "../../../types/Response.type";
import axiosClient from "../axiosClient";
import { Vehicle } from "./type";

export const getMyVehicleAPI = () =>
  axiosClient.get<Response<Vehicle>>("/users/me/vehicle");

export const createMyVehicleAPI = (data: Omit<Vehicle, "id" | "status">) =>
  axiosClient.post<Response<Vehicle>>("/users/me/vehicle", data);

export const updateMyVehicleAPI = (data: Omit<Vehicle, "id" | "status">) =>
  axiosClient.put<Response<Vehicle>>("/users/me/vehicle", data);
