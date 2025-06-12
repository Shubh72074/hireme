const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  name: {
    type: String,
    required: true,
  }, 
  resumeUrl: {
    type: String,
    required: true,
  },

}, { timestamps: true });

module.exports = mongoose.model("resume", resumeSchema);