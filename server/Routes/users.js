const express = require("express");
const router = new express.Router();

router.post("/", async (req, res) => {
  const client = new MongoClient(process.env.DATABASE_URL);

  try {
    await client.connect();
    const db = client.db("chat-app-db");
    const users = db.collection("users");
    const user = await users.findOne({ user_id: req.body.user_id });
    res.json(user);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

module.exports = router;
