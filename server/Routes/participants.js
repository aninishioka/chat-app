const express = require("express");
const router = new express.Router();
const Participant = require("../Models/Participant");

router.post("/", async (req, res) => {
  const searchOptions = {};
  if (req.body.searchText !== null && req.body.searchText !== "")
    searchOptions.username = new RegExp(req.body.searchText, "i");
  try {
    const users = await Participant.find(searchOptions);
    res.json(users);
  } catch {}
});

module.exports = router;
