import { SimplePost } from "../PostController/type";
import { Station } from "../StationsController/type";

export type User = {
  id: string;
  avatar: string;
  card: string;
  name: string;
  email: string;
  phone: string;
  averagePoint: number;
  status: "ACTIVE" | "INACTIVE";
};

export type SimpleTrip = {
  id: number;
  status: string;
  description: string;
  createdAt: string;
  startAt: string;
  finishAt: string;
  cancelAt: string;
  feedbackPoint: number;
  feedbackContent: string;
  startStationId: number;
  startStation: string;
  endStationId: number;
  endStation: string;
};
