import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

export const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const userFound = await userRepository.findOneBy({ id });

  if (!userFound) {
    throw new AppError("User not found", 404);
  }

  if (!userFound.isActive) {
    throw new AppError("User inactive", 400);
  }

  await userRepository.update(id, {
    isActive: false,
  });
};
