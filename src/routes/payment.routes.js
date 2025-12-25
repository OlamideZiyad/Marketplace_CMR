const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const paymentController = require("../controllers/payment.controller");

router.post(
  "/:orderId",
  authMiddleware,
  paymentController.createPaymentIntent
);

module.exports = router;
