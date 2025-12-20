const { Order, OrderItem, Product } = require("../models");

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    let total = 0;

    const order = await Order.create({
      buyerId: req.user.id,
      totalAmount: 0,
    });

    for (const item of items) {
      const product = await Product.findByPk(item.productId);

      if (!product || !product.isActive) {
        return res.status(400).json({ message: "Invalid product" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }

      const price = product.price * item.quantity;
      total += price;

      await OrderItem.create({
        orderId: order.id,
        productId: product.id,
        quantity: item.quantity,
        price,
      });

      await product.update({ stock: product.stock - item.quantity });
    }

    await order.update({ totalAmount: total });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.payOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order || order.buyerId !== req.user.id) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "paid") {
      return res.status(400).json({ message: "Order already paid" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalAmount * 100),
      currency: "xaf",
      metadata: {
        orderId: order.id,
        buyerId: req.user.id,
      },
    });

    await order.update({
      paymentIntentId: paymentIntent.id,
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};