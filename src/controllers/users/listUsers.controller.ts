import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { listUsersService } from "../../services/users/listUsers.service";

export const listUsersController = async (
  request: Request,
  response: Response
) => {
  const users = await listUsersService();
  return response.json(instanceToPlain(users));
};
