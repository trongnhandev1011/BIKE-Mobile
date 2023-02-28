import { PaginationResponse, Response } from "../../../types/Response.type";
import axiosClient from "../axiosClient";
import { Notification } from "./type";

export const getAllNotificationsAPI = (
  page: number = 1,
  pageSize: number = 20,
  status?: string
) =>
  axiosClient.get<PaginationResponse<Notification>>("/notifications", {
    params: {
      page: page,
      pageSize: pageSize,
      status: status,
    },
  });

export const readNotificationAPI = (notificationId: number) =>
  axiosClient.put<Response<boolean>>(`/notifications/${notificationId}/read`);
