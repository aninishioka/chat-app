const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  name: String,
  participants: {
    type: [{ user_id: String, username: String }],
    required: true,
  },
  lastMessage: String,
  lastMessageTime: Date,
  lastMessageAuthor: { type: { user_id: String, username: String } },
});

module.exports = mongoose.model("Chat", chatSchema);
