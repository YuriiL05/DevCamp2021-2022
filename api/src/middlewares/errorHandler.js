const customError = require('./customError');
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.log('==========================');
  console.log(err);
  if (err instanceof customError) {
    if (process.env.NODE_ENV === 'development') {
      res.status(err.status).send(err.stack);
    } else {
      res.status(err.status).send(err.message);
    }
  } else {
    res.status(500).send('Something went wrong');
  }
};

module.exports = errorHandler;
