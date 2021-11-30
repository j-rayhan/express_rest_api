const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  manufacturer: {
    type: String,
    trim: true,
  },
  model: {
    type: String,
    trim: true,
  },
  vin: {
    type: String,
    required: true,
    trim: true,
  },
  fuel: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('car', CarSchema);
