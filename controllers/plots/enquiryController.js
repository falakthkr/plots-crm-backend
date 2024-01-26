// controllers/enquiriesController.js
const Enquiry = require("../../models/enquiry");

exports.addEnquiry = async (req, res) => {
  try {
    const {
      plotId,
      userDetails,
      plotDirections,
      isCornerPlot,
      paymentMethod,
      pendingPayment,
      status,
    } = req.body;

    const newEnquiry = new Enquiry({
      plotId,
      userDetails,
      plotDirections,
      isCornerPlot,
      paymentMethod,
      pendingPayment,
      status,
    });

    await newEnquiry.save();

    res
      .status(201)
      .json({ message: "Enquiry added successfully.", enquiry: newEnquiry });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.status(200).json(enquiries);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
