import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../config/jwt";
import { ApiError } from "../utils/apiError";

interface TokenPayload {
  id: string;
  role: "admin" | "user";
}

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized");
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token) as TokenPayload;
  req.user = { id: decoded.id, role: decoded.role };
  next();
};
