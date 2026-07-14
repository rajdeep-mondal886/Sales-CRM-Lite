import { Request, Response } from "express";
import { AnalyticsService } from "../services/analytics.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const getOverview = catchAsync(async (_req: Request, res: Response) => {
  const data = await AnalyticsService.getOverview();
  sendResponse({ res, message: "Analytics fetched", data });
});

export const AnalyticsController = { getOverview };
