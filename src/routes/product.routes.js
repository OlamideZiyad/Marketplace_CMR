const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { protect } = require("../middlewares/auth.middleware");
const { isSeller } = require("../middlewares/role.middleware");

// Public
router.get("/", productController.getProducts);

// Seller
router.post("/", protect, isSeller, productController.createProduct);
router.put("/:id", protect, isSeller, productController.updateProduct);
router.delete("/:id", protect, isSeller, productController.deleteProduct);

module.exports = router;
