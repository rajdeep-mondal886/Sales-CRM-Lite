import { api } from "@/lib/api";
import type { ApiResponse, CreateLeadInput, Lead } from "@/types/api";

export async function getMyLeads() {
  const { data } = await api.get<ApiResponse<Lead[]>>("/api/v1/user/leads");
  return data.data ?? [];
}

export async function createLead(payload: CreateLeadInput) {
  const { data } = await api.post<ApiResponse<Lead>>(
    "/api/v1/user/leads",
    payload,
  );
  return data.data!;
}

export async function getAllLeads() {
  const { data } = await api.get<ApiResponse<Lead[]>>("/api/v1/admin/leads");
  return data.data ?? [];
}

export async function updateLeadStage(
  id: string,
  payload: { stage: string; status?: string },
) {
  const { data } = await api.patch<ApiResponse<Lead>>(
    `/api/v1/admin/leads/${id}/stage`,
    payload,
  );
  return data.data!;
}
