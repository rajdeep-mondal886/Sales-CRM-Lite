import axios, { type AxiosError } from "axios";
import { clearAuth, getToken } from "@/lib/auth-storage";
import type { ApiResponse } from "@/types/api";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse<unknown>>) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      const path = window.location.pathname;
      if (!path.startsWith("/login") && !path.startsWith("/register")) {
        clearAuth();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export function getErrorMessage(error: unknown, fallback = "Something went wrong"): string {
  if (axios.isAxiosError<ApiResponse<unknown>>(error)) {
    const msg = error.response?.data?.message;
    if (typeof msg === "string" && msg.length > 0) return msg;
    if (error.message) return error.message;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}
