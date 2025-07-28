const mongoose = require('mongoose');

const SendMessageSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, },
  message: { type: String, required: true }
}, { timestamps: true });


module.exports = mongoose.model('SendMessage', SendMessageSchema );