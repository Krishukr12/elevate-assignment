import axios from "axios";

export const axiosInstances = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
