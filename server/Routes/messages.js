const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Chat = require("../Models/Chat");
const Message = require("../Models/Message");

router.post("/", async (req, res) => {
  Chat.findOne({
    _id: mongoose.Types.ObjectId(req.body.chatId),
  })
    .then(async (chat) => {
      try {
        let messages = [];
        let participants = null;
        if (chat !== null) {
          participants = chat.participants;
          messages = await Message.find({ chatId: chat._id }).limit(100).sort({
            timestamp: -1,
          });
        }
        return [messages, participants];
      } catch (err) {
        throw err;
      }
    })
    .then(([messages, participants]) => {
      res.json({ participants: participants, messages: messages });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
