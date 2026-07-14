import { Response } from "express";

interface ResponseArgs<T> {
  res: Response;
  statusCode?: number;
  success?: boolean;
  message: string;
  data?: T;
}

export const sendResponse = <T>({
  res,
  statusCode = 200,
  success = true,
  message,
  data
}: ResponseArgs<T>) => {
  return res.status(statusCode).json({
    success,
    message,
    data
  });
};
