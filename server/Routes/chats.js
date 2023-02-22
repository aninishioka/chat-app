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

router.post("/", async (req, res) => {
  const self = await User.findOne({ firebaseUid: req.body.selfFbUid });
  const otherParticipant = await Participant.findOne({
    _id: mongoose.Types.ObjectId(req.body.otherId),
  });

  //check if there is an existing chat
  let chat = await Chat.findOne(
    {
      _id: { $in: self.chatIds },
      participants: { $elemMatch: { userId: otherParticipant._id } },
    },
    { _id: 1 }
  );

  //if chat exists, send back chatId. if not, send null
  let chatId = null;
  if (chat !== null) {
    chatId = chat._id;
  }

  res.json({ chatId: chatId });
});

module.exports = router;
