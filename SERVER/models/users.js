const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50
  },
  email:{type: String, unique: true},
  password:String,
  profilePic:String,
  token: String,
});

module.exports = mongoose.model("user", userSchema);