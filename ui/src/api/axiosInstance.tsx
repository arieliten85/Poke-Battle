import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_HOST_URL_BACK,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
