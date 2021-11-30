const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
  first_name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    trim: true,
  },
  age: {
    type: Number,
  },
  rating: {
    type: Number,
    default: 1,
    max: 5,
  },
  ip: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('employee', EmployeeSchema);
