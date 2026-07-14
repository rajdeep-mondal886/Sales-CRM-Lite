export type UserRole = "admin" | "user";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface LeadOwner {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Lead {
  _id: string;
  title: string;
  company: string;
  contactEmail?: string;
  value: number;
  status: string;
  stage: string;
  owner: string | LeadOwner;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateLeadInput {
  title: string;
  company: string;
  contactEmail?: string;
  value?: number;
  stage?: string;
}

export const LEAD_STAGES = [
  "new",
  "qualified",
  "proposal",
  "negotiation",
  "closed-won",
  "closed-lost",
] as const;

export interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string;
  isDone: boolean;
  assignedTo: string;
  lead?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  dueDate?: string;
  lead?: string;
}

export interface PipelineStage {
  name: string;
  order: number;
}

export interface Pipeline {
  _id: string;
  name: string;
  stages: PipelineStage[];
  isDefault: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface StageBreakdown {
  stage: string;
  count: number;
}

export interface AnalyticsOverview {
  users: number;
  leads: number;
  tasks: number;
  stageBreakdown: StageBreakdown[];
}
