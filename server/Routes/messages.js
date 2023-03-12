require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const router = express.Router();

//get messages and participants of given chat
router.get("/", async (req, res) => {
  const client = new MongoClient(process.env.DATABASE_URL);

  try {
    await client.connect();
    const db = client.db("chat-app-db");

    const chats = db.collection("chats");
    const chat = await chats.findOne({
      _id: new ObjectId(req.query.chatId),
    });

    let participants = [];
    let messageArray = [];
    if (chat) {
      participants = chat.participants;

      //get up to 100 most recent messages sorted by when created
      const messages = db.collection("messages");
      const messageDocs = await messages
        .find({ chat_id: req.query.chatId })
        .limit(100)
        .sort({ created_on: 1 });
      messageArray = await messageDocs.toArray();
    }
    res.json({ participants: participants, messages: messageArray });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

module.exports = router;
