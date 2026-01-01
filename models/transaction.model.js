const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ["UPI", "CARD", "NETBANKING"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["SUCCESS", "FAILED", "CANCELLED"],
      default: "SUCCESS",
    },
    transactionRef: {
      type: String,
      unique: true,
    },
    refundStatus: {
      type: String,
      enum: ["NOT_APPLICABLE", "INITIATED", "REFUNDED"],
      default: "NOT_APPLICABLE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
