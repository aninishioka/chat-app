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
      .find({
        participants: { $elemMatch: { user_id: req.query.uid } },
        last_message: { $exists: true },
      })
      .sort({ last_updated: -1 });
    const chatsArray = await returnedChats.toArray();
    res.json(chatsArray);
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
        return {
          user_id: user.user_id,
          username: user.username,
        };
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
