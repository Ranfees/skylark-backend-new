const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },

  userId: {
    type: String,
    required: true
  },

  carId: {
    type: String,
    required: true
  },

  pickupDate: {
    type: Date,
    required: true
  },

  returnDate: {
    type: Date,
    required: true
  },

  pickupLocation: {
    type: String,
    required: true
  },

  dropLocation: {
    type: String,
    required: true
  },

  driverOption: {
    type: String,
    enum: ['No Driver', 'With Driver'],
    required: true
  },

  paymentMethod: {
    type: String,
    enum: ['Cash', 'Online'],
    required: true
  },

  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },

  razorpayOrderId: {
    type: String
  },

  razorpayPaymentId: {
    type: String
  },

  razorpaySignature: {
    type: String
  },

  totalDays: {
    type: Number,
    required: true
  },

  totalAmount: {
    type: Number,
    required: true
  },

  pricePerDay: {
    type: Number,
    required: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
