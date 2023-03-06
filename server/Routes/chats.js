const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Chat = require("../Models/Chat");
const Participant = require("../Models/Participant");
const User = require("../Models/User");

router.post("/previews", async (req, res) => {
  Chat.find({
    participants: { $elemMatch: { firebaseUid: req.body.firebaseUid } },
    lastMessage: { $exists: true },
  })
    .sort({ lastMessageTime: -1 })
    .then((chats) => {
      res.json(chats);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", (req, res) => {
  User.findOne({ firebaseUid: req.body.selfFbUid })
    .then((user) => {
      return Chat.findOne(
        {
          _id: { $in: user.chatIds },
          participants: {
            $elemMatch: { firebaseUid: req.body.otherFbUid },
          },
        },
        { _id: 1 }
      );
    })
    .then((chat) => {
      res.json({ chatId: chat ? chat._id : null });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/new", (req, res) => {
  const currentParticipant = Participant.findOne({
    firebaseUid: req.body.selfFbUid,
  });

  const otherParticipant = Participant.findOne({
    firebaseUid: req.body.otherFbUid,
  });

  Promise.all([currentParticipant, otherParticipant])
    .then(async ([currentParticipant, otherParticipant]) => {
      let chat = null;
      try {
        chat = await Chat.create({
          participants: [
            {
              firebaseUid: otherParticipant.firebaseUid,
              username: otherParticipant.username,
            },
            {
              firebaseUid: currentParticipant.firebaseUid,
              username: currentParticipant.username,
            },
          ],
        });
        await User.updateMany(
          { firebaseUid: { $in: [req.body.selfFbUid, req.body.otherFbUid] } },
          { $push: { chatIds: chat._id } }
        );
      } catch (err) {
        throw err;
      }
      if (chat) res.json({ chatId: chat._id });
    })
    .catch((err) => {
      console.log(err);
    });

  /* const currentUser = await User.findOne({ firebaseUid: req.body.selfFbUid });
  const currentParticipant = await Participant.findOne({
    userId: currentUser._id,
  });
  const otherUser = await User.findOne({
    participantId: mongoose.Types.ObjectId(req.body.otherId),
  });
  const otherParticipant = await Participant.findOne({
    _id: mongoose.Types.ObjectId(req.body.otherId),
  });

  const chat = await Chat.create({
    participants: [
      { userId: otherParticipant._id, username: otherParticipant.username },
      { userId: currentParticipant._id, username: currentParticipant.username },
    ],
  });

  await User.updateMany(
    { _id: { $in: [currentUser._id, otherUser._id] } },
    { $push: { chatIds: chat._id } }
  );

  res.json({ chatId: chat._id }); */
});

module.exports = router;
