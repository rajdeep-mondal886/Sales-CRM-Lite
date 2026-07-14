import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError";

export const roleMiddleware = (...roles: Array<"admin" | "user">) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ApiError(403, "Forbidden");
    }
    next();
  };
};
