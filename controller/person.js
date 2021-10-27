const { ObjectId } = require('mongodb');
//
const Person = require('../models/person');
const { catchAsync } = require('../utils/helpers');
const APIFeatures = require('../utils/apIFeatures');
const { COLLECTIONS } = require('../utils/constant');
const AppError = require('../utils/appError');

const persons = COLLECTIONS.PERSONS;

exports.aliasTopPerson = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-age';
  req.query.fields = 'first_name,age,ip';
  next();
};

exports.checkId = catchAsync(async (req, res, next) => {
    const val = req.params.id;
    const response = await req.app.db
      .collection(persons)
      .findOne(ObjectId(val));
    if (!response) {
      throw new AppError(`No Item found with given ID:${val}`, 404);
    }
    next();
});

exports.list = catchAsync(async (req, res, next) => {
  // const _persons = req.app.db.collection(persons);
  // const features = new APIFeatures(_persons, req.query)
  //   .filter()
  //   .sort()
  //   .limitFields()
  //   .paginate();
  const _result = await Person.find().limit(5);
  res.json(_result);
});

exports.create = catchAsync(async (req, res, next) => {
  const response = await req.app.db.collection(persons).insertOne(req.body);
  const result = { _id: response.insertedId, ...req.body };
  res.json(result);
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const response = await req.app.db.collection(persons).findOne(ObjectId(id));
  res.json(response);
});

exports.updateOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const response = await req.app.db
    .collection(persons)
    .updateOne({ _id: ObjectId(id) }, { $set: { ...req.body } });
  if (response.modifiedCount === 1) {
    const result = { _id: id, ...req.body };
    return res.status(201).json(result);
  } else {
    return res.sendStatus(201);
  }
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const response = await req.app.db.collection(persons).delete(id);
  res.json(response);
});
