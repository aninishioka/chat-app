const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    chatId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, collection: "messages" }
);

module.exports = mongoose.model("Message", messageSchema);
