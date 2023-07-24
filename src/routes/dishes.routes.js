const { Router } = require("express");

const DishesController = require("../controllers/DishesController");
const ensureAuth = require("../middlewares/ensureAuth");

const dishesRoutes = Router();

const dishesController = new DishesController();

dishesRoutes.use(ensureAuth);

dishesRoutes.post("/", dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", dishesController.delete);
dishesRoutes.get("/", dishesController.index);

module.exports = dishesRoutes;
