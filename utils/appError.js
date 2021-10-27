const {STATUS} = require('./constant')

class AppError extends Error {
    constructor(message, statusCode){
        super(message);

        this.statusCode = statusCode || 500
        this.status = `${statusCode}`.startsWith('4') ? STATUS.FAIL : STATUS.ERROR
        // handle production error 
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = AppError;
