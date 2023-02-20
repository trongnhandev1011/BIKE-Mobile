import { User } from "../../../types";
import { Station } from "../StationsController/type";

export type SimplePost = {
  id: number;
  role: "GRABBER" | "PASSENGER";
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

export type CreatePost = {
  startStationId: number;
  endStationId: number;
  startTime: string;
  description: string;
  role: "GRABBER" | "PASSENGER";
};

export type PostDetail = {
  id: number;
  role: string;
  description: string;
  startTime: string;
  createdAt: string;
  modifiedAt: string;
  status: string;
  author: User;
  startStation: Station;
  endStation: Station;
  applications: User[];
};
