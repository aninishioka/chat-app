const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Chat = require("../Models/Chat");
const Message = require("../Models/Message");
const Participant = require("../Models/Participant");
const User = require("../Models/User");

router.post("/previews", async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: { $elemMatch: { firebaseUid: req.body.firebaseUid } },
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

router.post("/new", async (req, res) => {
  const currentUser = await User.findOne({ firebaseUid: req.body.selfFbUid });
  const currentParticipant = await Participant.findOne({
    userId: currentUser._id,
  });
  const otherUser = await User.findOne({
    participantId: mongoose.Types.ObjectId(req.body.otherId),
  });
  const otherParticipant = await Participant.findOne({
    _id: mongoose.Types.ObjectId(req.body.otherId),
  });

  const chat = await Chat.create({
    participants: [
      { userId: otherParticipant._id, username: otherParticipant.username },
      { userId: currentParticipant._id, username: currentParticipant.username },
    ],
  });

  await User.updateMany(
    { _id: { $in: [currentUser._id, otherUser._id] } },
    { $push: { chatIds: chat._id } }
  );

  res.json({ chatId: chat._id });
});

module.exports = router;
