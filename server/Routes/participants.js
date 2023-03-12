require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const router = new express.Router();

//get participants
router.get("/", async (req, res) => {
  const client = new MongoClient(process.env.DATABASE_URL);
  const searchOptions = {
    user_id: { $not: new RegExp(req.query.uid) },
  };

  if (req.query.searchText) {
    searchOptions.username = new RegExp(req.query.searchText, "i");
  }

  try {
    await client.connect();
    const db = client.db("chat-app-db");

    //get all participants but current user
    const participants = db.collection("participants");
    const filteredParticipants = await participants.find(searchOptions);
    const filteredArray = await filteredParticipants.toArray();
    res.json(filteredArray);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

module.exports = router;
