const express = require("express");
const Participant = require("../Models/Participant");
const router = express.Router();
const User = require("../Models/User");

router.get("/", async (req, res) => {
  const user = await User.findOne({ firebaseUid: req.header.AuthToken });
  const participant = await Participant.findOne({ userId: user._id });
  res.json({ partipant: participant });
});
