const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  tokens: [{
    token: { type: String, required: true }
  }]
}, { timestamps: true });

// Add this to initialize tokens array if it doesn't exist
AdminSchema.pre('save', function(next) {
  if (!this.tokens) {
    this.tokens = [];
  }
  next();
});

// Password hashing
AdminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password comparison method
AdminSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Admin', AdminSchema);