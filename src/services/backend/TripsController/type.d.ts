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
  postedStartTime: string;
  passengerId: string;
  passengerName: string;
  grabberId: string;
  grabberName: string;
};

export type TripDetail = {
  id: number;
  status: string;
  description: string;
  createdAt: string;
  startAt: string;
  finishAt: string;
  cancelAt: string;
  feedbackPoint: number;
  feedbackContent: string;
  startStation: {
    id: number;
    name: string;
    address: string;
    description: string;
    longitude: number;
    latitude: number;
  };
  endStation: {
    id: number;
    name: string;
    address: string;
    description: string;
    longitude: number;
    latitude: number;
  };
  grabber: {
    id: string;
    avatar: string;
    card: string;
    name: string;
    email: string;
    phone: string;
    averagePoint: number;
    status: string;
  };
  passenger: {
    id: string;
    avatar: string;
    card: string;
    name: string;
    email: string;
    phone: string;
    averagePoint: number;
    status: string;
  };
  post: {
    id: number;
    role: string;
    description: string;
    startTime: string;
    createdAt: string;
    modifiedAt: string;
    authorId: string;
    authorName: string;
    status: string;
    startStationId: number;
    startStation: string;
    endStationId: number;
    endStation: string;
  };
};
