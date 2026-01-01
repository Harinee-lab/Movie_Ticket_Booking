const paymentController = require("../controllers/payment.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

module.exports = (app) => {
  app.post(
    "/mba/api/v1/payments/:bookingId",
    authMiddleware.isAuthenticated,
    paymentController.makePayment
  );

  app.put(
    "/mba/api/v1/payments/cancel/:transactionId",
    authMiddleware.isAuthenticated,
    paymentController.cancelPayment
  );
};
