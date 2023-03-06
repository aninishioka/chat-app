const express = require("express");
const router = new express.Router();
const Participant = require("../Models/Participant");

router.get("/", async (req, res) => {
  const currentUser = await Participant.findOne({ firebaseUid: req.query.uid });
  const searchOptions = {};
  if (req.query.searchText !== null && req.query.searchText !== "")
    searchOptions.username = {
      $not: new RegExp(currentUser.username),
      $regex: new RegExp(req.query.searchText, "i"),
    };

  Participant.find(searchOptions)
    .then((participants) => {
      res.json(participants);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
