import axiosClient from "../axiosClient";

export function loginAPI(props: { code: string }) {
  const { code } = props;
  return axiosClient.post("/login", { code });
}

export function getAuthenticatedUserAPI() {
  return axiosClient.get("/me");
}
