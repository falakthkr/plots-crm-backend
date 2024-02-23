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

module.exports = {
  transferToBookings,
  getAllBookings,
};
