// models/Plot.js
const mongoose = require("mongoose");

const plotSchema = new mongoose.Schema({
  plotId: { type: Number, required: true },
  projectName: { type: String, required: true },
  isCorner: { type: Boolean, default: false },
  plotSize: { type: String, required: true },
  plotDirection: { type: String },
  oSize: { type: String },
  roadSize: { type: String },
  mgmt: { type: Boolean },
  appdSel: { type: Boolean },
});

const Plot = mongoose.model("Plot", plotSchema);

module.exports = Plot;
