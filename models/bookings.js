// bookingModel.js

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
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
  notes: String,
  totalPlotPrice: Number,
  pricePaid: Number,
  methodOfPayment: String,
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
