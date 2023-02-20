const mongoose = require("mongoose");

const participantSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, require: true },
  username: { type: String, require: true },
  //avatar
});

module.exports = mongoose.model("Participant", participantSchema);
