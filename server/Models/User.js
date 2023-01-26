const mongoose = require("mongoose");
const Participant = require("./Participant");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  chatIds: [], //should this be bound?
  participantId: mongoose.Schema.Types.ObjectId,
  //avatar
  //preferences
  //friends ??
});

userSchema.pre("save", async function (next) {
  const participant = await Participant.create({
    userId: this._id,
    name: this.name,
  });
  this.participantId = participant._id;
  next();
});

module.exports = mongoose.model("User", userSchema);
