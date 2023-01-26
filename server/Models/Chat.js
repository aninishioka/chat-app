const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  name: String,
  participants: Array,
});

module.exports = mongoose.model("Chat", chatSchema);
