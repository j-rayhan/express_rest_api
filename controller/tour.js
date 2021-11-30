/* eslint-disable no-unused-vars */
const { ObjectId } = require('mongodb');
//
const { Tour } = require('../models');
const { catchAsync } = require('../utils/helpers');
const APIFeatures = require('../utils/apIFeatures');
const { STATUS } = require('../utils/constant');
const AppError = require('../utils/appError');

exports.aliasTopFive = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-age';
  req.query.fields = 'first_name,age,ip';
  next();
};

exports.checkId = catchAsync(async (req, res, next) => {
  const val = req.params.id;
  const response = await Tour.findById(val);
  if (!response) {
    throw new AppError(`No Item found with given ID:${val}`, 404);
  }
  next();
});

exports.list = catchAsync(async (req, res, next) => {
  const response = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const result = await response.query;
  res.status(200).json({ code: 200, status: STATUS.SUCCESS, data: result });
});

exports.create = catchAsync(async (req, res, next) => {
  const data = await Tour.create(req.body);
  res.status(201).json({ code: 201, status: STATUS.SUCCESS, data });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = await Tour.findById(ObjectId(id));
  res.status(200).json({ status: STATUS.SUCCESS, data });
});

exports.updateOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = await Tour.findByIdAndUpdate(ObjectId(id), req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({ status: STATUS.SUCCESS, data });
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = await Tour.findByIdAndDelete(id);
  res.status(204).json({ status: STATUS.SUCCESS, data, message: 'The data was deleted successfully.' });
});

exports.checkStatus = catchAsync(async (req, res, next) => {
  const data = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: null,
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
  ]);
  res.status(200).json({ code: 200, status: STATUS.SUCCESS, data });
});
