import { compare } from "bcrypt";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/users";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../../errors/appError";

export const sessionService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("Invalid user or password", 403);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid user or password", 403);
  }

  const token = jwt.sign(
    {
      isAdm: user.isAdm,
      id: user.id,
      email: user.email,
      isActive: user.isActive
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: user.id,
    }
  );

  return token;
};
