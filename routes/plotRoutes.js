const express = require("express");
const plotsController = require("../controllers/plots/plotsController");

const router = express.Router();

router.get("/", plotsController.getPlotsData);
router.get("/plot-details/:plotId", plotsController.getPlotDetailsById);

module.exports = router;
