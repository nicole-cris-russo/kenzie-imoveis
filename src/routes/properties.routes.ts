import { Router } from "express";
import { createPropertyController } from "../controllers/properties/createProperty.controller";
import { listAllPropertiesController } from "../controllers/properties/listAllProperties.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureIsAdmMiddleware } from "../middlewares/ensureIsAdm.middleware";

export const propertiesRouter = Router();

propertiesRouter.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createPropertyController
);

propertiesRouter.get("", listAllPropertiesController);
