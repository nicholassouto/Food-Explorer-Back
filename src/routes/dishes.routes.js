const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishesController = require("../controllers/DishesController");
const DishesImageController = require("../controllers/DishesImageController");
const ensureAuth = require("../middlewares/ensureAuth");

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishesController = new DishesController();
const dishesImageController = new DishesImageController();

dishesRoutes.use(ensureAuth);

dishesRoutes.post("/", dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", dishesController.delete);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.patch("/image/:id", upload.single("image"), dishesImageController.update);
dishesRoutes.put("/:id", dishesController.update);

module.exports = dishesRoutes;
