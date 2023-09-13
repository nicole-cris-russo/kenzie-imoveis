import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

export const handleErrorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }
  console.log(error);

  return response.status(500).json({
    message: "Internal server error",
  });
};
