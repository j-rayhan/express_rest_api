const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
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
  ip: {
    type: String,
  },
}, { timestamp: true });

module.exports = mongoose.model('persons', PersonSchema);
