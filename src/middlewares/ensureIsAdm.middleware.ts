import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

export const ensureIsAdmMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.user.isAdm) {
    throw new AppError("User is not adm", 403);
  }

  return next();
};
