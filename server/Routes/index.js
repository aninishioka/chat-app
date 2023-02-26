const express = require("express");
const Participant = require("../Models/Participant");
const router = express.Router();
const User = require("../Models/User");

router
  .get("/", async (req, res) => {})
  .post("/new", async (req, res) => {
    await User.create({
      username: req.body.username,
      email: req.body.email,
      firebaseUid: req.body.firebaseUid,
    });
    res.sendStatus(200);
  });

module.exports = router;
