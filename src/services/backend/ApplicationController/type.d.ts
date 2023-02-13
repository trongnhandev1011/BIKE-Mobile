import { UserRoleConstants } from "../../../constants/UserRoleConstants";

export type SimpleApplication = {
  id: number;
  role: keyof typeof UserRoleConstants;
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
  accepted: boolean;
};
