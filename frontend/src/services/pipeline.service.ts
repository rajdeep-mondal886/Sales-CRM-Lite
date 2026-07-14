import { api } from "@/lib/api";
import type { ApiResponse, Pipeline } from "@/types/api";

export async function getPipelines() {
  const { data } = await api.get<ApiResponse<Pipeline[]>>(
    "/api/v1/user/pipelines",
  );
  return data.data ?? [];
}
