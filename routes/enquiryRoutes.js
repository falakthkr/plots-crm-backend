// enquiryRoutes.js

const express = require("express");
const enquiryController = require("../controllers/enquiry/enquiriesController");
const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

// Route to add an enquiry
router.post("/add-enquiry", enquiryController.addEnquiry);
router.get("/", enquiryController.getAllEnquiries);

// Export the router
module.exports = router;
