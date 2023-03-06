const express = require("express");
const router = new express.Router();
const Participant = require("../Models/Participant");

router.get("/", (req, res) => {
  const searchOptions = {};
  if (req.query.searchText !== null && req.query.searchText !== "")
    searchOptions.username = new RegExp(req.query.searchText, "i");
  Participant.find(searchOptions)
    .then((participants) => {
      res.json(participants);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
