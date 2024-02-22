// enquiryController.js

const Enquiry = require("../../models/enquiry");

// Controller function to add a new enquiry
async function addEnquiry(req, res) {
  console.log(req);
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
  } = req.body;

  // Basic validation
  if (
    !plotId ||
    !plotDirection ||
    !plotSize ||
    !plotPrice ||
    !userName ||
    !userPhoneNumber ||
    !userAddress
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
  };

  // Store the enquiry
  const enquiry = await new Enquiry(newEnquiry);
  await enquiry.save();

  // Respond with success message and the added enquiry
  res
    .status(201)
    .json({ message: "Enquiry added successfully", enquiry: newEnquiry });
}

async function getAllEnquiries(req, res) {
  try {
    const enquiries = await Enquiry.find();
    res.status(200).json(enquiries);
  } catch (error) {
    console.log(error);
    throw new Error("Error in fetching all enquiries");
  }
}

// Export the addEnquiry controller function
module.exports = {
  addEnquiry,
  getAllEnquiries,
};
