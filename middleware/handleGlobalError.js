const { STATUS } = require('../utils/constant');

const handleError = (err, res) => {
  const isProd = process.env.NODE_ENV === 'production';
  // Production error
  const { isOperational, statusCode, status, message, stack } = err;
  if (isProd) {
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
  console.log('global error stack 2 ===============>', err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || STATUS.ERROR;
  err.stack = err.stack;

  handleError(err, res);
};
