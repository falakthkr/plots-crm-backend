// controllers/plotsController.js
const Plot = require("../../models/plots");
const Enquiry = require("../../models/enquiry");

exports.getPlotsData = async (req, res) => {
  try {
    const plotsData = await Plot.find();

    res.status(200).json(plotsData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const calculateTotalEnquiries = async (plotId) => {
  try {
    const totalEnquiries = await Enquiry.countDocuments({ plotId });
    return totalEnquiries;
  } catch (error) {
    console.error(error);
    throw error; // Propagate the error for handling in the calling function
  }
};
