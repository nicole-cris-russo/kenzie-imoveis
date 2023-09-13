import { Router } from "express";
import { listSchedulesController } from "../controllers/schedules/listSchedules.controller";
import { createSchedulesController } from "../controllers/schedules/createSchedules.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureIsAdmMiddleware } from "../middlewares/ensureIsAdm.middleware";

export const schedulesRouter = Router();

schedulesRouter.post("", ensureAuthMiddleware, createSchedulesController);

schedulesRouter.get(
  "/properties/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  listSchedulesController
);
