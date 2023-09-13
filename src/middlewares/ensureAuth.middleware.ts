import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";

export const ensureAuthMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let token = request.headers.authorization;

  if (!token) {
    throw new AppError("Invalid token", 401)
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
    if (error) {
      throw new AppError("Invalid token", 401)
    }
    request.user = {
      id: decoded.sub,
      isAdm: decoded.isAdm,
      isActive: decoded.isActive,
      email: decoded.email,
    };
    return next();
  });
};
