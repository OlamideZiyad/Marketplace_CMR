const { Product } = require("../models");

// Create product (seller)
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      sellerId: req.user.id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all public products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { isActive: true },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update product (seller only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id, sellerId: req.user.id },
    });

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id, sellerId: req.user.id },
    });

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload product image
exports.uploadProductImage = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id, sellerId: req.user.id },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const imageUrl = req.file.path;

    const images = [...product.images, imageUrl];
    await product.update({ images });

    res.json({ images });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
