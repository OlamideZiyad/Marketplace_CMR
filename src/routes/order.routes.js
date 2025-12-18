const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const { protect } = require("../middlewares/auth.middleware");

router.post("/", protect, orderController.createOrder);
router.post("/:id/pay", protect, orderController.payOrder);

module.exports = router;
