const { Router } = require("express");

const usersRouter = require("./users.routes");
const dishesRouter = require("./dishes.routes");
const favoritesRouter = require("./favorites.routes");
const buyRouter = require("./buy.routes");

const sessionsRouter = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/dishes", dishesRouter);
routes.use("/favorites", favoritesRouter);
routes.use("/buy", buyRouter);

routes.use("/sessions", sessionsRouter);

module.exports = routes;
