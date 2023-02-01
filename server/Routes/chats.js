const express = require("express");
const router = express.Router();
const Chat = require("../Models/Chat");
const Message = require("../Models/Message");
const User = require("../Models/User");

router.get("/previews", async (req, res) => {
  try {
    const self = await User.findOne({ name: "Anissa" });
    const chats = await Chat.find({
      participants: { $elemMatch: { userId: self._id } },
    });
    res.json(chats);
  } catch (err) {
    console.log(err);
  }

  /* res.json({
    chats: [
      {
        name: "Nigel",
        messages: [
          ["Nigel", "hey"],
          ["Anissa", "hi"],
          ["Anissa", "what are you up to"],
        ],
      },
      { name: "Ryan", messages: [["Anissa", "soup"]] },
      { name: "Grace", messages: [["Grace", "woot"]] },
      { name: "Nicole", messages: [["Anissa", "lol"]] },
    ],
  }); */
});

router.get("/", async (req, res) => {
  try {
    const self = await User.findOne({ name: "Anissa" });
    const other = await User.findOne({ _id: req.query.userId });
    //check if there is an existing chat
    let chat = await Chat.findOne(
      {
        _id: { $in: self.chatIds },
        participants: { $elemMatch: { userId: other._id } },
      },
      { _id: 1 }
    );
    //if no chat exists, create new
    if (chat === null) {
      chat = await Chat.create({
        participants: [
          { userId: other._id, name: other.name },
          { userId: self._id, name: self.name },
        ],
      });
      await self.update({ $push: { chatIds: chat._id } });
      await other.update({ $push: { chatIds: chat._id } });
    }
    //pull existing messages for chat, if any
    const messages = await Message.find({ chatId: chat._id }).limit(100).sort({
      timestamp: -1,
    });
    res.json({ chatId: chat._id, messages: messages });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
