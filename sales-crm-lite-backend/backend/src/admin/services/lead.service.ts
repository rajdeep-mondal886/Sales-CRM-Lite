import { Lead } from "../../models/lead.model";

export const AdminLeadService = {
  getAllLeads: async () => Lead.find().populate("owner", "name email role").sort({ createdAt: -1 }),

  updateLeadStage: async (leadId: string, payload: { stage: string; status?: string }) => {
    return Lead.findByIdAndUpdate(leadId, payload, { new: true });
  }
};
