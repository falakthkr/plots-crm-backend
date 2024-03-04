// enquiryRoutes.js

const express = require("express");
const enquiryController = require("../controllers/enquiry/enquiriesController");
const {
  transferToBookings,
  getAllBookings,
  getBookingById,
  addPaymentToBooking,
  getPaymentsOfBooking,
  getAllBookedPlotIds,
} = require("../controllers/enquiry/bookingsController");
const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

// Route to add an enquiry
router.post("/add-enquiry", enquiryController.addEnquiry);
router.get("/", enquiryController.getAllEnquiries);
router.delete("/:id", enquiryController.deleteEnquiry);
router.post("/transfer", transferToBookings);
router.get("/all-bookings", getAllBookings);
router.get("/all-bookings/:id", getBookingById);
router.post("/booking/:id/add-payment", addPaymentToBooking);
router.get("/booking/:id/payments", getPaymentsOfBooking);
router.get("/booking/:status", getAllBookedPlotIds);

// Export the router
module.exports = router;
