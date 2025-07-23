const mongoose = require('mongoose');

const CarServiceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  car: { 
    model: { type: String, required: true },
    licensePlate: { type: String, required: true }
  },
  serviceType: { type: String, required: true },
  scheduledDate: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Completed'], default: 'Pending' },
  notes: { type: String },
  invoice: {
    totalCost: { type: Number },
    paymentStatus: { type: String, enum: ['Unpaid', 'Paid'], default: 'Unpaid' }
  }
}, { timestamps: true });

module.exports = mongoose.model('CarService', CarServiceSchema);