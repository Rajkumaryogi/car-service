const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  cars: [{ 
    model: { type: String, required: true },
    year: { type: Number },
    licensePlate: { type: String, required: true }
  }],
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
}, { timestamps: true });

// ✅ Password hashing
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Add unique sparse index for licensePlate
UserSchema.index({ 'cars.licensePlate': 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('User', UserSchema);
