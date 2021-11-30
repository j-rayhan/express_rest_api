const mongoose = require('mongoose');

const TourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    trim: true,
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  // enum : [inter medium, easy, difficult]
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: 1,
    max: 5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    require: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    require: [true, 'A tour must have a summary'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image']
  },
  images: [String],
  startDates: [Date],
}, { timestamps: true });

module.exports = mongoose.model('tour', TourSchema);
