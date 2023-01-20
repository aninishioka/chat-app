const express = require("express");
const router = new express.Router();
const User = require("../Models/User");

router.get("/", async (req, res) => {
  const searchOptions = {};
  if (req.query.name !== null && req.query.name !== "")
    searchOptions.name = new RegExp(req.query.name, "i");
  try {
    const users = await User.find(searchOptions);
    res.json(users);
  } catch {}
});

module.exports = router;
