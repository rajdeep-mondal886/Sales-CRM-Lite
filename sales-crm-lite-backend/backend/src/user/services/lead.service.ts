import { Lead } from "../../models/lead.model";

export const UserLeadService = {
  createLead: async (userId: string, payload: Record<string, unknown>) => {
    return Lead.create({ ...payload, owner: userId });
  },

  getMyLeads: async (userId: string) => {
    return Lead.find({ owner: userId }).sort({ createdAt: -1 });
  }
};
