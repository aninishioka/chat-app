const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  name: String,
  participants: {
    type: [{ firebaseUid: String, username: String }],
    required: true,
  },
  lastMessage: String,
  lastMessageTime: Date,
  lastMessageSender: String,
});

module.exports = mongoose.model("Chat", chatSchema);
