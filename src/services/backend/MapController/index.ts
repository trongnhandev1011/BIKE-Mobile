import axiosClient from "../axiosClient";

export const updateLocationAPI = (tripId: number, lat: number, long: number) =>
  axiosClient.post(
    "http://52.74.214.224:8080/api/v1/public/test/update-location",
    {
      tripId: tripId,
      latitude: lat,
      longitude: long,
    }
  );
