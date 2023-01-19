const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  //profile image
  //auth
});

module.exports = mongoose.model("User", userSchema);
