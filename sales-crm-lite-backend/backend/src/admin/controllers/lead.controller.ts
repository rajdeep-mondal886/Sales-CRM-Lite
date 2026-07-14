import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminLeadService } from "../services/lead.service";

const getLeads = catchAsync(async (_req: Request, res: Response) => {
  const data = await AdminLeadService.getAllLeads();
  sendResponse({ res, message: "Leads fetched", data });
});

const updateLeadStage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await AdminLeadService.updateLeadStage(id, req.body);
  sendResponse({ res, message: "Lead updated", data });
});

export const AdminLeadController = { getLeads, updateLeadStage };
