const Booking = require("../../models/bookings");
const Enquiry = require("../../models/enquiry");

const transferToBookings = async (req, res) => {
  try {
    const enquiryId = req.body.id; // Assuming you pass enquiryId in the request body
    const enquiry = await Enquiry.findById(enquiryId);

    // Create a new booking based on the enquiry with additional fields
    const newBooking = new Booking({
      plotId: enquiry.plotId,
      plotDirection: enquiry.plotDirection,
      plotSize: enquiry.plotSize,
      plotPrice: enquiry.plotPrice,
      userName: enquiry.userName,
      userPhoneNumber: enquiry.userPhoneNumber,
      userAddress: enquiry.userAddress,
      userEmail: enquiry.userEmail,
      notes: enquiry.notes,
      pricePaid: req.body.pricePaid,
      methodOfPayment: req.body.methodOfPayment,
      status: "booked",
    });

    // Save the new booking
    await newBooking.save();

    // Remove the enquiry from the enquiries collection
    await Enquiry.remove();

    res
      .status(200)
      .json({ message: "Enquiry transferred to bookings successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id; // Assuming you pass bookingId as a route parameter
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addPaymentToBooking = async (req, res) => {
  try {
    const bookingId = req.params.id; // Assuming you pass bookingId as a route parameter
    const { amount, date, paymentMethod } = req.body; // Assuming you pass amount, date, and method in the request body

    // Find the booking document by ID
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Add the new payment object to the payments array
    booking.payments.push({ amount, date, paymentMethod });

    // Save the updated booking document
    await booking.save();

    res
      .status(200)
      .json({ message: "Payment added to booking successfully", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPaymentsOfBooking = async (req, res) => {
  try {
    const bookingId = req.params.id; // Assuming you pass bookingId as a route parameter

    // Find the booking document by ID
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    console.log(booking);

    // Extract the payments array from the booking document and return it
    const payments = booking.payments;

    res.status(200).json({ payments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  transferToBookings,
  getAllBookings,
  getBookingById,
  addPaymentToBooking,
  getPaymentsOfBooking,
};
