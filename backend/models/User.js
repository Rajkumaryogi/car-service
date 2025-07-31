const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  cars: [{ 
    model: { type: String, required: true },
    year: { type: Number },
    licensePlate: { type: String, required: true }
  }],
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
}, { timestamps: true });

// Hash password
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 👇 THIS is needed
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
// ✅ Add this only ONCE
UserSchema.index({ 'cars.licensePlate': 1 }, { unique: true, sparse: true });

// 👇 THIS is CRITICAL
const User = mongoose.model('User', UserSchema);
module.exports = User;
