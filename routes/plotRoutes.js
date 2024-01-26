const express = require("express");
const plotsController = require("../controllers/plots/plotsController");
const enquiriesController = require("../controllers/plots/enquiryController");

const router = express.Router();

router.get("/plots", plotsController.getPlotsData);
router.post("/enquiry", enquiriesController.addEnquiry);
router.get("/all-enquiries", enquiriesController.getAllEnquiries);

module.exports = router;
