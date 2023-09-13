import { Router } from "express";
import { createUserController } from "../controllers/users/createUser.controller";
import { deleteUserController } from "../controllers/users/deleteUser.controller";
import { listUsersController } from "../controllers/users/listUsers.controller";
import { updateUserController } from "../controllers/users/updateUser.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureIsAdmMiddleware } from "../middlewares/ensureIsAdm.middleware";

export const routerUser = Router();

routerUser.post("", createUserController);
routerUser.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  listUsersController
);
routerUser.patch("/:id", ensureAuthMiddleware, updateUserController);
routerUser.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  deleteUserController
);
