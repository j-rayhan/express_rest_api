/* eslint-disable no-console */
const AppError = require('../utils/appError');
const { STATUS } = require('../utils/constant');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateErrorDB = (err) => {
  const value = err.stack.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const value = Object.keys(err.errors).map((el) => `${err.errors[el].properties.message}`);
  const message = `Invalid input data ${value.join('. ')}`;
  return new AppError(message, 400);
};
const handleError = (err, res) => {
  console.log('1  ===> ERROR*** isOperational ===========================>', err.errors);
  const isProd = process.env.NODE_ENV === 'production';
  // Production error
  const {
    isOperational, statusCode, status, message, stack, name, code,
  } = err;
  if (isProd) {
    let error = { ...err };

    if (name === 'CastError') {
      error = handleCastErrorDB(err);
      handleError(error, res);
      return;
    }
    if (code === 11000) {
      error = handleDuplicateErrorDB(err);
      handleError(error, res);
      return;
    }
    if (error?.["__message"]?.endsWith('ValidationError:')) {
      error = handleValidationErrorDB(err);
      return;
    }
    console.log('ERROR*** isOperational ===========================>', err);
    // Operational, trusted error: send message to client
    if (isOperational) {
      res.status(statusCode).json({
        code: statusCode,
        status,
        message,
      });
      // Programming or other unknown(lib error) : don't leak error details
    } else {
      // Log error
      // eslint-disable-next-line no-console
      console.log('ERROR***===========================>', err);
      // Send generic error message
      res.status(500).json({
        code: 500,
        status: STATUS.ERROR,
        message: 'An error occurred on the server. Please check the server.',
      });
    }
  } else {
    // Development error
    res.status(statusCode).json({
      code: statusCode,
      status,
      message,
      stack,
      error: err,
    });
  }
};

module.exports = (err, req, res, next) => {
  console.log('global error stack 2 ===============>', err);
  const error = {
    ...err,
    statusCode: err.statusCode || 500,
    status: err.status || STATUS.ERROR,
    stack: err.stack,
  };

  handleError(error, res);
};
