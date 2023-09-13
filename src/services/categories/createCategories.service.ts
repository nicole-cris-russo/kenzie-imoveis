import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";
import { ICategoryRequest } from "../../interfaces/categories";

export const createCategoriesService = async ({ name }: ICategoryRequest) => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const findCategory = await categoriesRepository.findOneBy({ name });

  if (findCategory) {
    throw new AppError("Category already exists", 400);
  }

  const createCategory = categoriesRepository.create({
    name,
  });

  await categoriesRepository.save(createCategory);

  return createCategory;
};
