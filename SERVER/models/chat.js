const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'user' },
  receiverId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'user' },
  content: { type: String },
  delivered: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);