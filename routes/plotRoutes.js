const express = require("express");
const plotsController = require("../controllers/plots/plotsController");
const enquiriesController = require("../controllers/plots/enquiryController");

const router = express.Router();

router.get("/plots", plotsController.getAllPlots);
router.get("/plots/:id", plotsController.getPlotById);
router.post("/enquiry", enquiriesController.addEnquiry);
router.get("/all-enquiries", enquiriesController.getAllEnquiries);

module.exports = router;
