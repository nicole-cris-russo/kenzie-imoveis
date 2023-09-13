import { Router } from "express";
import { createCategoriesController } from "../controllers/categories/createCategories.controller";
import { listAllCategoriesController } from "../controllers/categories/listAllCategories.controller";
import { listPropertiesByCategoryController } from "../controllers/categories/listPropertiesByCategory.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureIsAdmMiddleware } from "../middlewares/ensureIsAdm.middleware";

export const routerCategories = Router();

routerCategories.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createCategoriesController
);

routerCategories.get("", listAllCategoriesController);

routerCategories.get("/:id/properties", listPropertiesByCategoryController);
