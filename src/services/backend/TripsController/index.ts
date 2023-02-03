import { Response } from "../../../types/Response.type";
import axiosClient from "../axiosClient";
import { Trip } from "./type";

export const getCurrentTripAPI = () =>
  axiosClient.get<Response<Trip>>("/trips/current");
