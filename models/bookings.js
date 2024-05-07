// bookingModel.js

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paymentMethod: {
    type: String,
    required: true,
  },
});

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
  status: {
    type: String,
    required: true,
  },
  paymentOption: {
    type: String,
    required: true,
  },
  emiOptions: {
    type: String,
  },
  notes: String,
  payments: [paymentSchema],
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
