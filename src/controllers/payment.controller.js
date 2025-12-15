const stripe = require("../services/stripe.service");
const { Order } = require("../models");

exports.createPaymentIntent = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.orderId);

    if (!order || order.buyerId !== req.user.id) {
      return res.status(404).json({ message: "Order not found" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalAmount * 100),
      currency: "eur",
      metadata: { orderId: order.id },
    });

    await order.update({ paymentIntentId: paymentIntent.id });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
