const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceOffering', required: true },
  quantity: { type: Number, default: 1 }
});

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [CartItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);