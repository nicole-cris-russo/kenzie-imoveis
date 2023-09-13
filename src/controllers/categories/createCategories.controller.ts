import { Request, Response } from "express";
import { ICategoryRequest } from "../../interfaces/categories";
import { createCategoriesService } from "../../services/categories/createCategories.service";

export const createCategoriesController = async (
  request: Request,
  response: Response
) => {
  const data: ICategoryRequest = request.body;
  const responseCategory = await createCategoriesService(data);
  return response.status(201).json(responseCategory);
};
