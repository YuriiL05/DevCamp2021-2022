const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (process.env.NODE_ENV === 'development') {
    res.status(res.statusCode === 200 ? 500 : res.statusCode).send(err);
  } else {
    res
      .status(res.statusCode === 200 ? 500 : res.statusCode)
      .send({ error: 'Something went wrong' });
  }
};

module.exports = errorHandler;
