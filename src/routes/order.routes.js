const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middleware");


router.post("/", authMiddleware, orderController.createOrder);
router.post("/:id/pay", authMiddleware, orderController.payOrder);

module.exports = router;
