const Transaction = require("../models/transaction.model");
const Booking = require("../models/booking.model");
const { STATUS_CODES } = require("../utils/constants");
exports.makePayment = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .send({ message: "Booking not found" });
    }
    const transaction = await Transaction.create({
      bookingId: booking._id,
      paymentMode: req.body.paymentMode,
      transactionRef: "TXN" + Date.now(),
    });
    booking.status = "CONFIRMED";
    await booking.save();
    res.status(STATUS_CODES.CREATED).send(transaction);
  } catch (err) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }
};
exports.cancelPayment = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.transactionId);
    if (!transaction) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .send({ message: "Transaction not found" });
    }
    const booking = await Booking.findById(transaction.bookingId);
    if (!booking) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .send({ message: "Booking not found" });
    }
    if (booking.userId.toString() !== req.userId) {
      return res
        .status(STATUS_CODES.FORBIDDEN)
        .send({ message: "You are not authorized to cancel this booking" });
    }
    transaction.paymentStatus = "CANCELLED";
    transaction.refundStatus = "INITIATED";
    await transaction.save();

    booking.status = "CANCELLED";
    await booking.save();

    res.send({
      message: "Payment cancelled and refund initiated successfully",
    });
  } catch (err) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }
};
