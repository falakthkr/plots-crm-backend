// models/Plot.js
const mongoose = require("mongoose");

const plotSchema = new mongoose.Schema({
  plotNumber: { type: String, required: true },
  projectName: { type: String, required: true },
  isCornerPlot: { type: Boolean, default: false },
  price: { type: Number, required: true },
  totalEnquiries: { type: Number, required: true, default: 0 },
  // ... other fields
});

const Plot = mongoose.model("Plot", plotSchema);

module.exports = Plot;
