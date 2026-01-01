const bookingController = require("../controllers/booking.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

module.exports = (app) => {
  app.post(
    "/mba/api/v1/bookings",
    authMiddleware.isAuthenticated,
    bookingController.createBooking
  );
};
