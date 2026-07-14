import { api } from "@/lib/api";
import type { ApiResponse, CreateTaskInput, Task } from "@/types/api";

export async function getMyTasks() {
  const { data } = await api.get<ApiResponse<Task[]>>("/api/v1/user/tasks");
  return data.data ?? [];
}

export async function createTask(payload: CreateTaskInput) {
  const { data } = await api.post<ApiResponse<Task>>(
    "/api/v1/user/tasks",
    payload,
  );
  return data.data!;
}
