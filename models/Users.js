const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  text: Array,
  isBot: Boolean,
  skipCopy: Boolean,
  isLoading: Boolean,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  userChats: [chatSchema],
});

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
