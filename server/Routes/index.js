require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();
const User = require("../Models/User");

router.post("/new", async (req, res) => {
  const client = new MongoClient(process.env.DATABASE_URL);

  try {
    await client.connect();
    const db = client.db("chat-app-db");

    const users = db.collection("users");
    const userDoc = {
      user_id: req.body.user_id,
      username: req.body.username,
      chat_ids: new Array(),
    };
    await users.insertOne(userDoc);

    const participants = db.collection("participants");
    const participantDoc = {
      user_id: req.body.user_id,
      username: req.body.username,
      chat_ids: new Array(),
    };
    await participants.insertOne(participantDoc);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
  /*  User.create({
    username: req.body.username,
    email: req.body.email,
    user_id: req.body.firebaseUid,
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
    }); */
});

module.exports = router;
