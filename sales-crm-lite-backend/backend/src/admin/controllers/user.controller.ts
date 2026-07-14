import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminUserService } from "../services/user.service";

const getUsers = catchAsync(async (_req: Request, res: Response) => {
  const data = await AdminUserService.getAllUsers();
  sendResponse({ res, message: "Users fetched", data });
});

const updateRole = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await AdminUserService.updateRole(id, req.body.role);
  sendResponse({ res, message: "User role updated", data });
});

export const AdminUserController = { getUsers, updateRole };
