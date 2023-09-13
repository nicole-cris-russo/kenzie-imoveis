import "express-async-errors";
import "reflect-metadata";
import express from "express";
import { routerUser } from "./routes/user.routes";
import { sessionRouter } from "./routes/session.routes";
import "express-async-errors";
import { handleErrorMiddleware } from "./middlewares/handleError.middleware";
import { schedulesRouter } from "./routes/schedulesUsersProperties.routes";
import { propertiesRouter } from "./routes/properties.routes";
import { routerCategories } from "./routes/categories.routes";

const app = express();
app.use(express.json());

app.use("/users", routerUser);
app.use("/login", sessionRouter);
app.use("/categories", routerCategories);
app.use("/schedules", schedulesRouter);
app.use("/properties", propertiesRouter);

app.use(handleErrorMiddleware);

/* app.listen(3333, () => {
  console.log("Server running in port 3333");
}); */

export default app;
