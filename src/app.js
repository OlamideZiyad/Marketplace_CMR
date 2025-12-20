const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Importer les routes existantes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const paymentRoutes = require('./routes/payment.routes');
const sellerRoutes = require('./routes/seller.routes');
const webhookRoutes = require('./routes/webhook.routes');
const categoryRoutes = require('./routes/category.routes');


const app = express();

app.use("/api/webhooks", require("./routes/webhook.routes"));

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Route test
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API is running !" });
});
// Routes principales
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/categories', categoryRoutes);



module.exports = app;
