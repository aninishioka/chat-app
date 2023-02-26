const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Chat = require("../Models/Chat");
const Message = require("../Models/Message");
const Participant = require("../Models/Participant");
const User = require("../Models/User");

router.post("/", async (req, res) => {
  let chat = await Chat.findOne({
    _id: mongoose.Types.ObjectId(req.body.chatId),
  });

  //fetch messages
  let messages = [];
  let participants = null;
  if (chat !== null) {
    participants = chat.participants;
    messages = await Message.find({ chatId: chat._id }).limit(100).sort({
      timestamp: -1,
    });
  }

  res.json({ participants: participants, messages: messages });
});

router.post("/aasdfadsf", async (req, res) => {
  try {
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

    //if chat exists, fetch messages
    let messages = [];
    let chatId = null;
    if (chat !== null) {
      chatId = chat._id;
      messages = await Message.find({ chatId: chat._id }).limit(100).sort({
        timestamp: -1,
      });
    }

    //if no chat exists, create new
    /* if (chat === null) {
        chat = await Chat.create({
          participants: [
            { userId: other._id, name: other.name },
            { userId: self._id, name: self.name },
          ],
        });
        await self.update({ $push: { chatIds: chat._id } });
        await other.update({ $push: { chatIds: chat._id } });
      } */

    res.json({ chatId: chatId, messages: messages });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
