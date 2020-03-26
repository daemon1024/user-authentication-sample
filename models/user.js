const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nickname: String,
  email: String,
  password: String,
  pic: String
});

module.exports = mongoose.model("user", UserSchema);
