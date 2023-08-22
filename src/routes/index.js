const { Router } = require("express");

const usersRouter = require("./users.routes");
const dishesRouter = require("./dishes.routes");
const favoritesRouter = require("./favorites.routes");
const buyRouter = require("./buy.routes");
const boughtRouter = require("./bought.routes");
const boughtRouterADM = require("./boughtADM.routes");
const sessionsRouter = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/dishes", dishesRouter);
routes.use("/favorites", favoritesRouter);
routes.use("/buy", buyRouter);
routes.use("/bought", boughtRouter);
routes.use("/boughtADM", boughtRouterADM);
routes.use("/sessions", sessionsRouter);

module.exports = routes;
