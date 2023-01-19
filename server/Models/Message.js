const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sentAt: { type: Date, required: true },
  message: { type: String, required: true },
  user: { type: mongoose.SchemaType.ObjectId, required: true },
  chat: { type: mongoose.SchemaType.ObjectId, required: true },
});

messageSchema.pre("save", function (next) {
  this.sentAt = Date.now();
  next();
});

module.exports = mongoose.model("Message", messageSchema);
