const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const model = {};

model.mongoose = mongoose;
model.User = require('./user');
model.Car = require('./car');
model.Tour = require('./tour');
model.Employee = require('./employee');

module.exports = model;
