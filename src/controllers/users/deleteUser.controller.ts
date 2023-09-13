import { Request, Response } from "express";
import { deleteUserService } from "../../services/users/deleteUser.service";

export const deleteUserController = async (
  request: Request,
  response: Response
) => {
  const idUser: string = request.params.id;
  await deleteUserService(idUser);
  return response.status(204).json();
};
