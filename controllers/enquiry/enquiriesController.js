// enquiryController.js

const Enquiry = require("../../models/enquiry");

// Controller function to add a new enquiry
const addEnquiry = async (req, res) => {
  const {
    plotId,
    plotDirection,
    plotSize,
    plotPrice,
    userName,
    userPhoneNumber,
    userAddress,
    userEmail,
    notes,
    status,
  } = req.body;

  // Basic validation
  if (
    !plotId ||
    !plotDirection ||
    !plotSize ||
    !plotPrice ||
    !userName ||
    !userPhoneNumber ||
    !userAddress ||
    !status
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Create new enquiry object
  const newEnquiry = {
    plotId,
    plotDirection,
    plotSize,
    plotPrice,
    userName,
    userPhoneNumber,
    userAddress,
    userEmail,
    notes,
    status: "inEnquiry",
  };

  // Store the enquiry
  const enquiry = await new Enquiry(newEnquiry);
  await enquiry.save();

  // Respond with success message and the added enquiry
  res
    .status(201)
    .json({ message: "Enquiry added successfully", enquiry: newEnquiry });
};

const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.status(200).json(enquiries);
  } catch (error) {
    console.log(error);
    throw new Error("Error in fetching all enquiries");
  }
};

const deleteEnquiry = async (req, res) => {
  const enquiryId = req.params.id;
  try {
    // Find the enquiry by ID and delete it
    const deletedEnquiry = await Enquiry.findByIdAndDelete(enquiryId);

    if (!deletedEnquiry) {
      return res.status(404).json({ error: "Enquiry not found" });
    }

    // Respond with success message
    res.status(200).json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export the addEnquiry controller function
module.exports = {
  addEnquiry,
  getAllEnquiries,
  deleteEnquiry,
};
