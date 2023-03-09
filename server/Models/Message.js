const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    author: { type: { user_id: String, username: String }, required: true },
    chatId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, collection: "messages" }
);

module.exports = mongoose.model("Message", messageSchema);
