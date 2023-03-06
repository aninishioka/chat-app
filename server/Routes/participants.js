const express = require("express");
const router = new express.Router();
const Participant = require("../Models/Participant");

router.post("/", (req, res) => {
  const searchOptions = {};
  if (req.body.searchText !== null && req.body.searchText !== "")
    searchOptions.username = new RegExp(req.body.searchText, "i");
  Participant.find(searchOptions)
    .then((participants) => {
      res.json(participants);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
