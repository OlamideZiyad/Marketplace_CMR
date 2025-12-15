const stripe = require("../services/stripe.service");
const { Order } = require("../models");
const emailQueue = require("../queues/email.queue");

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const orderId = paymentIntent.metadata.orderId;

    await Order.update(
      { status: "paid" },
      { where: { id: orderId } }
    );

    await emailQueue.add("orderPaid", {
      email: "client@email.com",
      orderId,
    });
  }

  res.json({ received: true });
};
