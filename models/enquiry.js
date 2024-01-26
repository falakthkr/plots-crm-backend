// models/Enquiry.js
const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  plotId: { type: mongoose.Schema.Types.ObjectId, ref: "Plot", required: true },
  userDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  plotNumber: { type: Number, required: true },
  plotDirections: { type: String, required: true },
  isCornerPlot: { type: Boolean, default: false },
  paymentMethod: { type: String, required: true },
  pendingPayment: { type: Number, required: true },
  completedPayment: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["Sold", "Can’t be sold", "Not sold"],
    default: "Not sold",
  },
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);

module.exports = Enquiry;
