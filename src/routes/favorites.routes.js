const { Router } = require("express");

const FavoritesController = require("../controllers/FavoritesController");
const ensureAuth = require("../middlewares/ensureAuth");

const favoritesRoutes = Router();

const favoritesController = new FavoritesController();

favoritesRoutes.use(ensureAuth);

favoritesRoutes.post("/", favoritesController.create);
favoritesRoutes.get("/", favoritesController.index);
favoritesRoutes.delete("/:dishes_id", favoritesController.delete);

module.exports = favoritesRoutes;
