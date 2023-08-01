const { Router } = require("express");

const BuyController = require("../controllers/BuyController");
const ensureAuth = require("../middlewares/ensureAuth");

const buyRoutes = Router();

const buyController = new BuyController();

buyRoutes.use(ensureAuth);

buyRoutes.post("/", buyController.create);
buyRoutes.get("/", buyController.index);
buyRoutes.delete("/:id", buyController.delete);

module.exports = buyRoutes;
