import { Request, Response } from "express";
import { sessionService } from "../../services/session/session.service";
import { IUserLogin } from "../../interfaces/users";

export const sessionController = async (
  request: Request,
  response: Response
) => {
  const user: IUserLogin = request.body;
  const token = await sessionService(user);
  return response.status(200).json({ token });
};
