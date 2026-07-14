import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserLeadService } from "../services/lead.service";

const createLead = catchAsync(async (req: Request, res: Response) => {
  const userId = String(req.user?.id);
  const data = await UserLeadService.createLead(userId, req.body);
  sendResponse({ res, statusCode: 201, message: "Lead created", data });
});

const getMyLeads = catchAsync(async (req: Request, res: Response) => {
  const userId = String(req.user?.id);
  const data = await UserLeadService.getMyLeads(userId);
  sendResponse({ res, message: "Leads fetched", data });
});

export const UserLeadController = { createLead, getMyLeads };
