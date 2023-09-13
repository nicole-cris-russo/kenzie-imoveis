import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";

export const listAllPropertiesService = async () => {
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const properties = propertiesRepository.find();

  return properties;
};
