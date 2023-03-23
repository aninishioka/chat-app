require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();

//find all chats current user participanting in and return in order of when last updated
router.get("/previews", async (req, res) => {
  const client = new MongoClient(process.env.DATABASE_URL);

  try {
    await client.connect();
    const db = client.db("chat-app-db");
    const chats = db.collection("chats");

    const returnedChats = await chats
      .aggregate([
        //1. match by user_id in participants
        {
          $match: {
            participants: req.query.uid,
          },
        },
        //2. unwind participants
        { $unwind: { path: "$participants" } },

        //3. get avatars from participants collection
        {
          $lookup: {
            from: "participants",
            localField: "participants",
            foreignField: "user_id",
            as: "participant_info",
          },
        },

        //4. reverse unwind
        {
          $group: {
            _id: {
              _id: "$_id",
              last_message: "$last_message",
              last_message_author: "$last_message_author",
              last_updated: "$last_updated",
            },
            participants: { $push: { $arrayElemAt: ["$participant_info", 0] } },
          },
        },

        //5. clean up doc structure
        {
          $project: {
            _id: "$_id._id",
            last_message: "$_id.last_message",
            last_message_author: "$_id.last_message_author",
            last_updated: "$_id.last_updated",
            participants: "$participants",
          },
        },

        //6. sort by last_updated
        {
          $sort: {
            last_updated: -1,
          },
        },
      ])
      .toArray();
    res.json(returnedChats);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

//get id of chat bw current user and participant
router.get("/", async (req, res) => {
  const client = new MongoClient(process.env.DATABASE_URL);

  try {
    await client.connect();
    const db = client.db("chat-app-db");

    //if exists, return id of chat between currentUser and participant
    const users = db.collection("users");
    const currentUser = await users.findOne({ user_id: req.query.selfUid });
    const chats = db.collection("chats");
    const chat = await chats.findOne({
      _id: { $in: currentUser.chat_ids },
      participants: { $elemMatch: { user_id: req.query.otherUid } },
    });
    res.json({ chatId: chat ? chat._id : null });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

//create new chat
router.post("/new", async (req, res) => {
  const client = new MongoClient(process.env.DATABASE_URL);

  try {
    await client.connect();
    const db = client.db("chat-app-db");

    //get user docs for participants
    const users = db.collection("users");
    const participatingUsers = await users.find({
      user_id: { $in: [req.body.selfUid, req.body.otherUid] },
    });
    const usersArray = await participatingUsers.toArray();

    //create new chat doc
    const chats = db.collection("chats");
    const chatDoc = {
      participants: usersArray.map((user) => {
        return user.user_id;
      }),
      last_updated: Date.now(),
    };
    const chatInsertDoc = await chats.insertOne(chatDoc);

    //update user docs with new chatId
    await users.updateMany(
      {
        user_id: {
          $in: usersArray.map((user) => {
            return user.user_id;
          }),
        },
      },
      { $push: { chat_ids: chatInsertDoc.insertedId } }
    );

    res.json({ chatId: chatInsertDoc.insertedId });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

module.exports = router;
