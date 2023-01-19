const mongoose = require("mongoose");

const chatSchema = new mongooseSchema({
  name: String,
});

module.exports = mongoose.model("Chat", chatSchema);
