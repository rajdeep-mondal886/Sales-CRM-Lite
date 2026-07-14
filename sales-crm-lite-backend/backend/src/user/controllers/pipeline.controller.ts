import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserPipelineService } from "../services/pipeline.service";

const getPipelines = catchAsync(async (_req: Request, res: Response) => {
  const data = await UserPipelineService.getPipelines();
  sendResponse({ res, message: "Pipelines fetched", data });
});

export const PipelineController = { getPipelines };
