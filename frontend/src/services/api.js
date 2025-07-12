import axios from "axios";
import { getToken } from "./auth";

const API = axios.create({
  baseURL: "/",
});

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;