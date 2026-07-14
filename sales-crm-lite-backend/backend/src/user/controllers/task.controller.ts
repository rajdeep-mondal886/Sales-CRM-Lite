import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TaskService } from "../services/task.service";

const createTask = catchAsync(async (req: Request, res: Response) => {
  const userId = String(req.user?.id);
  const data = await TaskService.createTask(userId, req.body);
  sendResponse({ res, statusCode: 201, message: "Task created", data });
});

const getMyTasks = catchAsync(async (req: Request, res: Response) => {
  const userId = String(req.user?.id);
  const data = await TaskService.getMyTasks(userId);
  sendResponse({ res, message: "Tasks fetched", data });
});

export const TaskController = { createTask, getMyTasks };
