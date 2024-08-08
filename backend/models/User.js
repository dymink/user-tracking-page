const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  email: String,
  avatar: String,
  accessedAt: { type: Date, default: Date.now },
  scrolledToImage: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
