import { DocumentData } from "firebase/firestore";

export type FSTripRequest = {
  user: string;
  biker: string | null;
  fromLocation: string;
  toLocation: string;
  createdAt: string;
  status: string;
  bookingTime: string;
  id: string;
} & DocumentData;
