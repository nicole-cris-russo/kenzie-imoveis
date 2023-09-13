import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { SchedulesUsersProperties } from "../../entities/schedulesUsersProperties.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

export const createSchedulesService = async ({
  date,
  hour,
  propertyId,
  userId,
}: IScheduleRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const propertyRepository = AppDataSource.getRepository(Properties);
  const schedulesRepository = AppDataSource.getRepository(
    SchedulesUsersProperties
  );

  const findUser = await userRepository.findOneBy({ id: userId });
  const findProperty = await propertyRepository.findOneBy({ id: propertyId });
  const findSchedulesHour = await schedulesRepository.findOneBy({ hour });
  const findSchedulesDate = await schedulesRepository.findOneBy({ date });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  if (!findProperty) {
    throw new AppError("Property not found", 404);
  }

  const newTime = new Date(`${date} ${hour}`);
  const newHour = newTime.getHours();
  const newDate = newTime.getDay();

  if (newHour < 8 || newHour >= 18) {
    throw new AppError("Outside opening hours", 400);
  }

  if (newDate === 0 || newDate === 6) {
    throw new AppError("Unavailable days", 400);
  }

  if (findSchedulesHour && findSchedulesDate) {
    throw new AppError("Time already programmed", 400);
  }

  const createSchedules = schedulesRepository.create({
    date,
    hour,
    property: findProperty,
    user: findUser,
  });

  await schedulesRepository.save(createSchedules);

  return createSchedules;
};
