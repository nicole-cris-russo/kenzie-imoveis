import { hash } from "bcrypt";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserUpdate, IUser } from "../../interfaces/users";

export const updateUserService = async (
  data: IUserUpdate,
  isAdmLogin: boolean,
  idLogin: string,
  id: string
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const keys = Object.keys(data);

  if (
    keys.includes("isAdm") ||
    keys.includes("isActive") ||
    keys.includes("id")
  ) {
    throw new AppError("Fields cannot be edited", 401);
  }

  const users = await userRepository.find();

  if (!isAdmLogin && id !== idLogin) {
    throw new AppError("Unauthorized", 401);
  }

  if (!isAdmLogin && id === idLogin) {
    const userNotAdm = users.find((user) => user.id === idLogin);

    const id = userNotAdm?.id;

    const findUser = await userRepository.findOneBy({ id });

    await userRepository.update(id!, {
      name: data.name ? data.name : findUser!.name,
      email: data.email ? data.email : findUser!.email,
      password: data.password
        ? await hash(data.password, 10)
        : findUser!.password,
    });

    const user = await userRepository.findOneBy({
      id,
    });

    return user!;
  }

  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  await userRepository.update(id, {
    name: data.name ? data.name : findUser.name,
    email: data.email ? data.email : findUser.email,
    password: data.password ? await hash(data.password, 10) : findUser.password,
  });

  const user = await userRepository.findOneBy({
    id,
  });

  return user!;
};
