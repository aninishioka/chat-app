const express = require("express");
const router = express.Router();
const Chat = require("../Models/Chat");
const Message = require("../Models/Message");
const User = require("../Models/User");

router.get("/previews", async (req, res) => {
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
  /*const searchOptions = {};
  try {
    const chatIds = await User.find({name: "Anissa"}, {chatIds : 1});
    const chats = await Chat.find({$or chatIds});
    res.json(chats.map((chat) => {
      
    }));
  } catch {
    
  }*/
});

router.get("/", async (req, res) => {
  try {
    const self = await User.findOne({ name: "Anissa" });
    const other = await User.findOne({ _id: req.query.userId });
    const chat = await Chat.findOne(
      {
        _id: { $in: self.chatIds },
        participants: { $elemMatch: { $in: [other._id] } },
      },
      { _id: 1 }
    );
    let chatId = chat._id;
    if (chatId === null) {
      const chat = await Chat.create({ participants: [other._id, self._id] });
      let chatId = chat._id;
      await self.update({ $push: { chatIds: chatId } });
      await other.update({ $push: { chatIds: chatId } });
    }
    const messages = await Message.find({ chatId: chatId }).limit(100).sort({
      timestamp: -1,
    });
    res.json({ chatId: chatId, messages: messages });
  } catch (err) {
    console.log(err);
  }
});

router.post("/new", async (res, req) => {
  try {
    const chat = await Chat.create({ participants: [] });
  } catch {}
});

module.exports = router;
