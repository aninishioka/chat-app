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

    const participantsDoc = await chats
      .aggregate([
        {
          $match: {
            _id: new ObjectId(req.query.chatId),
          },
        },
        {
          $unwind: { path: "$participants" },
        },
        {
          $lookup: {
            from: "participants",
            localField: "participants",
            foreignField: "user_id",
            as: "participant_info",
          },
        },
        {
          $group: {
            _id: "$_id",
            participants: { $push: { $arrayElemAt: ["$participant_info", 0] } },
          },
        },
      ])
      .toArray();
    const messages = db.collection("messages");
    const messageDocs = await messages
      .find({ chat_id: new ObjectId(req.query.chatId) }) //change to ObjectId(req.query.chatId)
      .limit(100)
      .sort({ created_on: 1 });
    messageArray = await messageDocs.toArray();

    res.json({
      participants: participantsDoc[0].participants,
      messages: messageArray,
    });
    /*  const chat = await chats.findOne({
      _id: new ObjectId(req.query.chatId),
    });

    let participants = [];
    let messageArray = [];
    if (chat) {
      participants = chat.participants;

      //get up to 100 most recent messages sorted by when created
      const messages = db.collection("messages");
      const messageDocs = await messages
        .find({ chat_id: new ObjectId(req.query.chatId) }) //change to ObjectId(req.query.chatId)
        .limit(100)
        .sort({ created_on: 1 });
      messageArray = await messageDocs.toArray();
    }
    res.json({ participants: participants, messages: messageArray }); */
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

module.exports = router;
