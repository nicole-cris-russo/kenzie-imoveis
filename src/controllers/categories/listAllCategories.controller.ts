import { Request, Response } from "express";
import { listAllCategoriesService } from "../../services/categories/listAllCategories.service";

export const listAllCategoriesController = async (
  request: Request,
  response: Response
) => {
  const responseCategories = await listAllCategoriesService()
  return response.status(200).json(responseCategories);
};
