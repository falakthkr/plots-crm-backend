const mongoose = require("mongoose");

// Define the enquiry schema
const enquirySchema = new mongoose.Schema({
  plotId: {
    type: String,
    required: true,
  },
  plotDirection: {
    type: String,
    required: true,
  },
  plotSize: {
    type: String,
    required: true,
  },
  plotPrice: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userPhoneNumber: {
    type: String,
    required: true,
  },
  userAddress: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  notes: String,
});

// Create a model based on the schema
const Enquiry = mongoose.model("Enquiry", enquirySchema);

// Export the model
module.exports = Enquiry;
