import { Request, Response } from "express";
import { listPropertiesByCategoryService } from "../../services/categories/listPropertiesByCategory.service";

export const listPropertiesByCategoryController = async (
  request: Request,
  response: Response
) => {
  const idCategory: string = request.params.id;
  const responsePropertiesByCategory = await listPropertiesByCategoryService(
    idCategory
  );
  return response.status(200).json(responsePropertiesByCategory);
};
