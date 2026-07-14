import { api } from "@/lib/api";
import type { ApiResponse, AuthPayload } from "@/types/api";

export async function login(email: string, password: string) {
  const { data } = await api.post<ApiResponse<AuthPayload>>(
    "/api/v1/user/auth/login",
    { email, password },
  );
  return data.data!;
}

export async function register(name: string, email: string, password: string) {
  const { data } = await api.post<ApiResponse<AuthPayload>>(
    "/api/v1/user/auth/register",
    { name, email, password },
  );
  return data.data!;
}
