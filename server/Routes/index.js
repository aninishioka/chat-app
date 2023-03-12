require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();
const User = require("../Models/User");

//create new user
router.post("/new", async (req, res) => {
  const client = new MongoClient(process.env.DATABASE_URL);

  try {
    await client.connect();
    const db = client.db("chat-app-db");

    //create and insert new user doc into db
    const users = db.collection("users");
    const userDoc = {
      user_id: req.body.user_id,
      username: req.body.username,
      chat_ids: new Array(),
    };
    await users.insertOne(userDoc);

    //create and insert new participant doc into db.
    //each user has a corresponding participant doc that mirrors given user's public information
    //to limit information other users' can have access to
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
});

module.exports = router;
