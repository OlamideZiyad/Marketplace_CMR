const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware");

router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
