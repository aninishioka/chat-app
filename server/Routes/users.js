const express = require("express");
const router = new express.Router();
const User = require("../Models/User");

router.post("/", async (req, res) => {
  const user = await User.findOne({ firebaseUid: req.body.firebaseUid });
  res.json(user);
});

module.exports = router;
