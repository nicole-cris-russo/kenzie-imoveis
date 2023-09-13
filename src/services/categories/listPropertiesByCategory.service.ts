import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";

export const listPropertiesByCategoryService = async (idCategory: string) => {
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const findCategory = await categoriesRepository.findOneBy({ id: idCategory });

  if (!findCategory) {
    throw new AppError("Non-existent category", 404);
  }

  const findProperties = await categoriesRepository.findOne({
    where: {
      id: idCategory
    },
    relations: {
      properties: true
    }
  });

  return findProperties;
};
