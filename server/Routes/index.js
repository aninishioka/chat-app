const express = require("express");
const router = express.Router();
const User = require("../Models/User");

router.post("/new", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    firebaseUid: req.body.firebaseUid,
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
