import { api } from "@/lib/api";
import type { AnalyticsOverview, ApiResponse } from "@/types/api";

export async function getOverview() {
  const { data } = await api.get<ApiResponse<AnalyticsOverview>>(
    "/api/v1/admin/analytics/overview",
  );
  return data.data!;
}
