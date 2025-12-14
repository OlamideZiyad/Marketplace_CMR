const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware");
const { isSeller } = require("../middlewares/role.middleware");

router.get("/dashboard", protect, isSeller, (req, res) => {
  res.json({ message: "Welcome seller", user: req.user });
});

module.exports = router;
