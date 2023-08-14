const { Router } = require("express");

const BoughtController = require("../controllers/BoughtController");
const ensureAuth = require("../middlewares/ensureAuth");

const boughtRoutes = Router();

const boughtController = new BoughtController();

boughtRoutes.use(ensureAuth);

boughtRoutes.post("/", boughtController.create);
boughtRoutes.get("/", boughtController.index);

module.exports = boughtRoutes;
