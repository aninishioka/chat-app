const mongoose = require("mongoose");
const Participant = require("./Participant");

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  username: { type: String, required: true },
  chat_ids: [], //should this be bound?
  participantId: mongoose.Schema.Types.ObjectId,
  //avatar
  //preferences
  //friends ??
});

userSchema.pre("save", async function (next) {
  await Participant.create({
    username: this.username,
    user_id: this.firebaseUid,
  });
  next();
});

module.exports = mongoose.model("User", userSchema);
