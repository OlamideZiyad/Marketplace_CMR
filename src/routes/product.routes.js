const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { protect } = require("../middlewares/auth.middleware");
const { isSeller } = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");

// Public
router.get("/", productController.getProducts);

// Seller
router.post("/", protect, isSeller, productController.createProduct);
router.put("/:id", protect, isSeller, productController.updateProduct);
router.delete("/:id", protect, isSeller, productController.deleteProduct);

router.post(
  "/:id/images",
  protect,
  isSeller,
  upload.single("image"),
  productController.uploadProductImage
);

module.exports = router;


