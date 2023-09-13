import AppDataSource from "../../data-source";
import { IUser, IUserRequest } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import { hash } from "bcrypt";
import { AppError } from "../../errors/appError";

export const createUserService = async ({
  name,
  email,
  isAdm,
  password,
}: IUserRequest): Promise<IUser | string> => {
  const userRepository = AppDataSource.getRepository(User);

  const existingEmail = await userRepository.findOneBy({
    email: email,
  });

  if (existingEmail) {
    throw new AppError("Email already exists", 400);
  }

  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    isAdm,
    password: hashedPassword,
  });

  await userRepository.save(user);

  return user;
};
