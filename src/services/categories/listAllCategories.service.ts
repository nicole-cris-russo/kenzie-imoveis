import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";

export const listAllCategoriesService = async (): Promise<Categories[]> => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const categories = await categoriesRepository.find();

  return categories;
};
