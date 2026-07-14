import { api } from "@/lib/api";
import type { ApiResponse, User, UserRole } from "@/types/api";

export async function getAllUsers() {
  const { data } = await api.get<ApiResponse<User[]>>("/api/v1/admin/users");
  return data.data ?? [];
}

export async function updateUserRole(id: string, role: UserRole) {
  const { data } = await api.patch<ApiResponse<User | null>>(
    `/api/v1/admin/users/${id}/role`,
    { role },
  );
  return data.data;
}
