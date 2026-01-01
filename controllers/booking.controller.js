const Booking = require("../models/booking.model");
const { STATUS_CODES } = require("../utils/constants");

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      userId: req.userId, // ✅ FIX (IMPORTANT)
      movieId: req.body.movieId,
      theatreId: req.body.theatreId,
      seats: req.body.seats,
      totalAmount: req.body.totalAmount,
    });

    res.status(STATUS_CODES.CREATED).send(booking);
  } catch (err) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }
};
