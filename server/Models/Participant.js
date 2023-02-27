const mongoose = require("mongoose");

const participantSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, require: true },
  username: { type: String, require: true },
  firebaseUid: { type: String, require: true },
  socketId: { type: String },
  //avatar
});

module.exports = mongoose.model("Participant", participantSchema);
