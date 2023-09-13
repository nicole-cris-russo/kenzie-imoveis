import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties";

export const createPropertyService = async ({
  address,
  categoryId,
  size,
  value,
}: IPropertyRequest): Promise<Properties> => {
  const addressesRepository = AppDataSource.getRepository(Addresses);
  const categoriesRepository = AppDataSource.getRepository(Categories);
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const findAddresses = await addressesRepository.findOneBy({
    zipCode: address.zipCode,
    number: address.number,
  });

  if (address.zipCode.length > 8) {
    throw new AppError("Invalid code", 400);
  }

  if(address.state.length > 2) {
    throw new AppError("Invalid size", 400)
  }

  if (findAddresses) {
    throw new AppError("Address already exists", 400);
  }
  const createAddress = addressesRepository.create(address);

  await addressesRepository.save(createAddress);

  const findCategory = await categoriesRepository.findOneBy({
    id: categoryId,
  });

  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }

  const createProperty = propertiesRepository.create({
    value,
    size,
    address: createAddress,
    category: findCategory,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await propertiesRepository.save(createProperty);

  return createProperty;
};
