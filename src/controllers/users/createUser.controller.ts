import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/users";
import { createUserService } from "../../services/users/createUser.service";

export const createUserController = async (
  request: Request,
  response: Response
) => {
  const user: IUserRequest = request.body;
  const createdUser = await createUserService(user);
  return response.status(201).json(instanceToPlain(createdUser));
};
