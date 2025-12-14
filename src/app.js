const express = require("express");
const cors = require("cors");
const morgan = require("morgan");


const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Route test
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API is running !" });
});
// Routes principales
//auth
app.use("/api/auth", require("./routes/auth.routes"));
//user
app.use("/api/users", require("./routes/user.routes"));
//seller 
app.use("/api/seller", require("./routes/seller.routes"));
//Product
app.use("/api/products", require("./routes/product.routes"));
// Commande 
app.use("/api/orders", require("./routes/order.routes"));



module.exports = app;
