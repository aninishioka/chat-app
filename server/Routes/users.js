const express = require("express");
const router = new express.Router();
const User = require("../Models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch {}
});

modules.export = router;
