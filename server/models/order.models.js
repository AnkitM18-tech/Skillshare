const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  payerId: {
    type: String,
    required: true,
  },
  instructorId: {
    type: String,
    required: true,
  },
  instructorName: {
    type: String,
    required: true,
  },
  courseImage: {
    type: String,
    required: true,
  },
  courseTitle: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  coursePricing: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
