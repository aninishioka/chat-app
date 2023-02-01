const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  name: String,
  participants: {
    type: [{ userId: mongoose.Types.ObjectId, name: String }],
    required: true,
  },
  lastMessage: String,
  lastMessageTime: Date,
});

module.exports = mongoose.model("Chat", chatSchema);
