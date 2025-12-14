const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware");
const paymentController = require("../controllers/payment.controller");

router.post(
  "/:orderId",
  protect,
  paymentController.createPaymentIntent
);

module.exports = router;
