const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Chat = require("../Models/Chat");
const Message = require("../Models/Message");
const Participant = require("../Models/Participant");
const User = require("../Models/User");

router.post("/previews", async (req, res) => {
  try {
    const self = await Participant.findOne({
      firebaseUid: req.body.firebaseUid,
    });
    const chats = await Chat.find({
      participants: { $elemMatch: { participantId: self._id } },
      lastMessage: { $exists: true },
    }).sort({ lastMessageTime: -1 });
    res.json(chats);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {});

module.exports = router;
