const { Router } = require("express");

const BoughtADMController = require("../controllers/BoughtADMController");
const ensureAuth = require("../middlewares/ensureAuth");

const boughtRoutesADM = Router();

const boughtADMController = new BoughtADMController();

boughtRoutesADM.use(ensureAuth);

boughtRoutesADM.get("/", boughtADMController.index);
boughtRoutesADM.put("/:id/status", boughtADMController.updateStatus);

module.exports = boughtRoutesADM;
