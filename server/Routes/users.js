const express = require("express");
const router = new express.Router();
const User = require("../Models/User");

router.post("/", async (req, res) => {
  User.findOne({ firebaseUid: req.body.firebaseUid })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
