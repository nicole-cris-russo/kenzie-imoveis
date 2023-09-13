import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { SchedulesUsersProperties } from "../../entities/schedulesUsersProperties.entity";
import { AppError } from "../../errors/appError";

export const listSchedulesService = async (
  idProperty: string
): Promise<Properties> => {
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const schedulesRespository = AppDataSource.getRepository(
    SchedulesUsersProperties
  );

  const findProperty = await propertiesRepository.findOneBy({ id: idProperty });

  if (!findProperty) {
    throw new AppError("Property not found", 404);
  }

  const findSchedules = await propertiesRepository.findOne({
    where: {
      id: idProperty,
    },
    relations: {
      schedules: true,
    },
  });

  if (!findSchedules) {
    throw new AppError("Schedules not found", 404);
  }

  return findSchedules;
};
