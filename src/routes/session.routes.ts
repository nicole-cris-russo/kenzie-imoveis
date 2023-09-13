import { Router } from "express";
import { sessionController } from "../controllers/session/session.controller";

export const sessionRouter = Router();

sessionRouter.post("", sessionController);
