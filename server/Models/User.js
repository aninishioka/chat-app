const mongoose = require("mongoose");
const Participant = require("./Participant");

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true },
  username: { type: String, required: true },
  chatIds: [], //should this be bound?
  participantId: mongoose.Schema.Types.ObjectId,
  //avatar
  //preferences
  //friends ??
});

userSchema.pre("save", async function (next) {
  const participant = await Participant.create({
    userId: this._id,
    username: this.username,
    firebaseUid: this.firebaseUid,
  });
  this.participantId = participant._id;
  next();
});

module.exports = mongoose.model("User", userSchema);
