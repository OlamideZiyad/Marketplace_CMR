const stripe = require("../services/stripe.service");
const { Order } = require("../models");

exports.createPaymentIntent = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.orderId);

    if (!order || order.buyerId !== req.user.id) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔒 Vérification si la commande est déjà payée
    if (order.status === "paid") {
      return res.status(400).json({ message: "Order already paid" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "xaf",
      amount: order.totalAmount * 100, // si total en XAF
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
