// controllers/plotsController.js
const Plot = require("../../models/plots");
const Enquiry = require("../../models/enquiry");

exports.updatePlotStatus = async (req, res) => {
  try {
    const { plotId } = req.params;
    const { status } = req.body;

    // Validate status
    if (!["booked", "inEnquiry", "open"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const plot = await Plot.findOneAndUpdate({ plotId }, { status });

    if (!plot) {
      return res.status(404).json({ message: "Plot not found" });
    }

    res.status(200).json(plot);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getPlotsData = async (req, res) => {
  try {
    const plotsData = await Plot.find();

    res.status(200).json(plotsData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getPlotDetailsById = async (req, res) => {
  try {
    const { plotId } = req.params;
    const plotData = await Plot.findOne({ plotId });

    if (!plotData) {
      return res.status(404).json({ message: "Plot not found" });
    }

    res.status(200).json(plotData);
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
