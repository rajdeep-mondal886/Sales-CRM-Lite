import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "../services/auth.service";

const register = catchAsync(async (req: Request, res: Response) => {
  const data = await AuthService.register(req.body);
  sendResponse({
    res,
    statusCode: 201,
    message: "User registered successfully",
    data
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const data = await AuthService.login(req.body);
  sendResponse({
    res,
    message: "Login successful",
    data
  });
});

export const AuthController = { register, login };
