import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { updateUserService } from "../../services/users/updateUser.service";
import { IUserUpdate } from "../../interfaces/users";

export const updateUserController = async (
  request: Request,
  response: Response
) => {
  const user: IUserUpdate = request.body;
  const isAdmLogin: boolean = request.user.isAdm;
  const idLogin: string = request.user.id;
  const id: string = request.params.id;
  const updatedUser = await updateUserService(user, isAdmLogin, idLogin, id);
  return response.status(200).json(instanceToPlain(updatedUser));
};
