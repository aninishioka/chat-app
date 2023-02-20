const express = require("express");
const Participant = require("../Models/Participant");
const router = express.Router();
const User = require("../Models/User");

router
  .get("/", async (req, res) => {
    const user = await User.findOne({ firebaseUid: req.body("firebaseUid") });
    const participant = await Participant.findOne({ userId: user._id });
    res.json({ partipant: participant });
  })
  .post("/new", async (req, res) => {
    await User.create({
      username: req.body.username,
      email: req.body.email,
      firebaseUid: req.body.firebaseUid,
    });
  });

module.exports = router;
