const mongoose = require("mongoose");

const plotSchema = new mongoose.Schema({
  plotId: {
    type: String,
    required: true,
  },
  plotSize: {
    type: String,
    required: true,
  },
  plotDirection: {
    type: String,
    required: true,
  },
  plotPrice: {
    type: Number,
    required: true,
  },
  totalPlotEnquiries: {
    type: Number,
    default: 0,
  },
  plotStatus: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Plot", plotSchema);
