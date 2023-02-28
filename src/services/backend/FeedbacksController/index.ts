import axiosClient from "../axiosClient";

export const createFeedbackAPI = (
  tripId: number,
  request: { point: number; content: string }
) => axiosClient.post(`/trips/${tripId}/feedbacks`, request);
